import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  adjustChildren,
  findNodeByClassName,
  findNodeById,
} from "../utils/nodeUtils";
import {
  projectDrag,
  projectInfo,
  selectBlockId,
  selectRowId,
} from "../utils/atoms";
import useProject from "./useProject";
import {
  CONTAINER_CARD_HEIGHT,
  CONTAINER_CARD_WIDTH,
  PATCH_PROJECT_TYPES,
} from "../constants/constants";

const useDraggable = () => {
  const project = useRecoilValue(projectInfo);
  const setProject = useSetRecoilState(projectInfo);
  const setSelectedRowId = useSetRecoilState(selectRowId);
  const setSelectedBlockId = useSetRecoilState(selectBlockId);
  const [isDrag, setProjectDrag] = useRecoilState(projectDrag);
  const { patchProject } = useProject();

  const handleDragStart = useCallback(
    (e) => {
      setProjectDrag(true);
      setSelectedBlockId(null);
      const id = e.target.childNodes.length;
      const nodeString = JSON.stringify(adjustChildren(id));
      e.dataTransfer.setData("text/plain", nodeString);

      const dragImage = e.target.cloneNode(true);

      dragImage.style.width = `${CONTAINER_CARD_WIDTH}px`;
      dragImage.style.height = `${CONTAINER_CARD_HEIGHT}px`;
      dragImage.style.border = "2px solid #3742fa";
      dragImage.style.borderRadius = "15px";

      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, CONTAINER_CARD_WIDTH / 2, 0);

      setTimeout(() => document.body.removeChild(dragImage), 0);
    },
    [setProjectDrag]
  );

  const handleDragEnd = useCallback((e) => {
    e.preventDefault();
    document.querySelectorAll(".container-row").forEach((el) => {
      el.style.boxShadow = "";
    });
  }, []);

  const handleDrop = (e) => {
    if (!isDrag) {
      e.preventDefault();
      setSelectedBlockId(null);

      let colIndex;

      const nodeString = e.dataTransfer.getData("text/plain");
      const nodeObject = JSON.parse(nodeString);
      const containerRowId = e.target.closest(".container-row").id;

      const contentRowId = e.target.closest(".content-row").id;
      const contentColId = e.target.closest(".content-col").id;
      const containerTable = e.target.closest(".container-table");

      containerTable.style.minHeight = "0px";

      const rowIndex = project.component.findIndex(
        (row) => row.nodeId === containerRowId
      );

      setProject((prev) => {
        const newProject = JSON.parse(JSON.stringify(prev));
        const targetRow = newProject.component.find(
          (row) => row.nodeId === containerRowId
        );

        const contentRow = findNodeById(targetRow, contentRowId);

        colIndex = contentRow.children.findIndex(
          (col) => col.nodeId === contentColId
        );

        const targetCol = findNodeById(targetRow, contentColId);

        targetCol.children = [nodeObject];

        return newProject;
      });

      const type = nodeObject.className.split("-")[1];
      const td = findNodeByClassName(nodeObject, `content-${type}-col`);

      console.log(
        containerRowId,
        contentColId,
        td.nodeId,
        td.children[0].nodeId
      );

      setSelectedBlockId({
        row: containerRowId,
        col: contentColId,
        td: td.nodeId,
        target: td.children[0].nodeId,
      });

      patchProject.mutate({
        projectId: project._id,
        nodeObject,
        rowIndex,
        colIndex,
        type: PATCH_PROJECT_TYPES.ADD_BLOCK,
      });
    } else {
      let rowIndex;

      const nodeString = e.dataTransfer.getData("text/plain");
      const nodeObject = JSON.parse(nodeString);
      const containerRow = e.target.closest(".container-row");

      if (!project.component.length) {
        rowIndex = 0;
        setProject((prev) => ({ ...prev, component: [nodeObject] }));
      } else {
        const rect = containerRow.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;

        const findIndex = project.component.findIndex(
          (row) => row.nodeId === containerRow.id
        );

        if (e.clientY < mid) {
          rowIndex = findIndex;
        } else {
          rowIndex = findIndex + 1;
        }

        setProject((prev) => {
          const newComponents = [...prev.component];

          newComponents.splice(rowIndex, 0, nodeObject);

          return {
            ...prev,
            component: newComponents,
          };
        });
      }

      const row = nodeObject.nodeId;
      const col = findNodeByClassName(nodeObject, "container-col").nodeId;
      const target = findNodeByClassName(nodeObject, "container-table").nodeId;

      setSelectedRowId({
        row,
        col,
        target,
      });

      patchProject.mutate({
        projectId: project._id,
        nodeObject,
        rowIndex,
        colIndex: null,
        type: PATCH_PROJECT_TYPES.ADD_ROW,
      });

      document.querySelectorAll(".container-row").forEach((el) => {
        el.style.boxShadow = "";
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    const containerRow = e.target.closest(".container-row");
    if (containerRow) {
      document.querySelectorAll(".container-row").forEach((el) => {
        el.style.boxShadow = "";
      });

      const rect = containerRow.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      if (relativeY < rect.height / 2) {
        containerRow.style.boxShadow = "0px -5px 10px -5px rgba(0,0,0,0.5)";
      } else {
        containerRow.style.boxShadow = "0px 5px 10px -5px rgba(0,0,0,0.5)";
      }
    }
  };

  return { handleDragStart, handleDragEnd, handleDrop, handleDragOver };
};

export default useDraggable;
