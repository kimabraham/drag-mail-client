import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { adjustChildren } from "../utils/nodeUtils";
import { projectDrag, projectInfo } from "../utils/atoms";
import useProject from "./useProject";
import {
  CONTAINER_CARD_HEIGHT,
  CONTAINER_CARD_WIDTH,
} from "../constants/constants";

const useDraggable = (dragStyle) => {
  const [project, setProject] = useRecoilState(projectInfo);
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
    [dragStyle]
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
      const nodeString = e.dataTransfer.getData("text/plain");
      const nodeObject = JSON.parse(nodeString);
      const containerRowId = e.target.closest(".container-row").id;
      const contentColId = e.target.closest(".content-col").id;
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
                            tr.children.forEach((td) => {
                              console.log(td);
                              console.log(nodeObject);
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

        return newProject; // 수정된 프로젝트 반환
      });
    } else {
      let newIndex;

      const nodeString = e.dataTransfer.getData("text/plain");
      const nodeObject = JSON.parse(nodeString);

      if (!project.component.length) {
        newIndex = 0;
        setProject((prev) => ({ ...prev, component: [nodeObject] }));
      } else {
        const containerRow = e.target.closest(".container-row");
        const rect = containerRow.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        console.log(project.component);
        const findIndex = project.component.findIndex(
          (row) => row.nodeId === containerRow.id
        );

        if (relativeY < 50) {
          newIndex = findIndex;
        } else {
          newIndex = findIndex + 1;
        }

        setProject((prev) => {
          const newComponents = [...prev.component];

          newComponents.splice(newIndex, 0, nodeObject);

          setTimeout(() => {
            const addedElement = document.querySelector(`#${nodeObject.id}`);
            if (addedElement) {
              addedElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 0);

          return {
            ...prev,
            component: newComponents,
          };
        });
      }

      patchProject.mutate({ projectId: project._id, nodeObject, newIndex });

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
