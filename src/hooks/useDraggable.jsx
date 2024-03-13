import { adjustChildren } from "../utils/nodeUtils";

const useDraggable = (dragStyle) => {
  const handleDragStart = (e) => {
    const { width, height } = dragStyle;
    const id = e.target.childNodes.length;
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
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
  };

  return { handleDragStart, handleDragEnd };
};

export default useDraggable;
