import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { adjustChildren } from "../utils/nodeUtils";
import { projectInfo } from "../utils/atoms";
import useProject from "./useProject";

const useDraggable = (dragStyle) => {
  const [project, setProject] = useRecoilState(projectInfo);
  const { patchProject } = useProject();

  const handleDragStart = useCallback(
    (e) => {
      const cardClassName = e.target.className.toLowerCase();
      const isContent = cardClassName.includes("card");
      const isTextCard = cardClassName.includes("text");
      if (isContent) {
        if (isTextCard) {
          console.log("text");
        } else {
          console.log("image");
        }
      }

      const { width, height } = dragStyle;
      const id = e.target.childNodes.length;
      console.log(id);
      const nodeString = JSON.stringify(adjustChildren(id));
      e.dataTransfer.setData("text/plain", nodeString);

      const dragImage = e.target.cloneNode(true);

      dragImage.style.width = `${width}px`;
      dragImage.style.height = `${height}px`;
      dragImage.style.border = "2px solid #3742fa";
      dragImage.style.borderRadius = "15px";

      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, width / 2, 0);

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
    e.preventDefault();
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
