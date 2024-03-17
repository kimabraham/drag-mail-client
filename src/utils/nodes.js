import { v4 as uuidv4 } from "uuid";

export const defaultColNode = () => {
  return {
    nodeId: uuidv4(),
    tag: "td",
    className: "content-col",
    style: {
      width: "100%",
      height: "100%",
      padding: "10px",
      verticalAlign: "top",
    },
    children: [
      {
        nodeId: uuidv4(),
        tag: "table",
        className: "content-default-table",
        style: {
          width: "100%",
          height: "100%",
          // minHeight: "100px",
          borderCollapse: "collapse",
          border: "1px dashed #70a1ff",
        },
        children: [],
      },
    ],
  };
};
