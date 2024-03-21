import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { adjustChildren } from "../utils/nodeUtils";
import { projectDrag, projectInfo } from "../utils/atoms";
import useProject from "./useProject";
import {
  CONTAINER_CARD_HEIGHT,
  CONTAINER_CARD_WIDTH,
  PATCH_PROJECT_TYPES,
} from "../constants/constants";

const useDraggable = () => {
  const project = useRecoilValue(projectInfo);
  const setProject = useSetRecoilState(projectInfo);
  const [isDrag, setProjectDrag] = useRecoilState(projectDrag);
  const { patchProject } = useProject();

  const handleDragStart = useCallback(
    (e) => {
      setProjectDrag(true);
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

      let colIndex;
      const nodeString = e.dataTransfer.getData("text/plain");
      const nodeObject = JSON.parse(nodeString);
      const containerRowId = e.target.closest(".container-row").id;
      const contentColId = e.target.closest(".content-col").id;
      const containerTable = e.target.closest(".container-table");

      containerTable.style.minHeight = "0px";

      const rowIndex = project.component.findIndex(
        (row) => row.nodeId === containerRowId
      );

      setProject((prev) => {
        const newProject = JSON.parse(JSON.stringify(prev));

        newProject.component.forEach((row) => {
          if (row.nodeId === containerRowId) {
            row.children.forEach((col) => {
              col.children.forEach((table) => {
                table.children.forEach((tbody) => {
                  tbody.children.forEach((tr) => {
                    tr.children.forEach((td) => {
                      td.children.forEach((table) => {
                        table.children.forEach((tbody) => {
                          tbody.children.forEach((tr) => {
                            colIndex = tr.children.findIndex(
                              (col) => col.nodeId === contentColId
                            );
                            tr.children.forEach((td) => {
                              if (td.nodeId === contentColId) {
                                td.children = [nodeObject];
                              }
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          }
        });

        return newProject;
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
