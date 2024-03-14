import { v4 as uuidv4 } from "uuid";
import { defaultColNode } from "./nodes";

export const adjustChildren = (count) => {
  const defaultRow = {
    nodeId: uuidv4(),
    tag: "tr",
    className: "container-row",
    style: {
      height: "100%",
    },
    children: [
      {
        nodeId: uuidv4(),
        tag: "td",
        className: "container-col",
        style: {
          width: "100%",
          height: "100%",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "table",
            className: "container-table",
            style: {
              width: "100%",
              height: "100%",
              minHeight: "100px",
              borderCollapse: "collapse",
            },
            children: [
              {
                nodeId: uuidv4(),
                tag: "tbody",
                className: "container-tbody",
                style: {
                  height: "100%",
                },
                children: [
                  {
                    nodeId: uuidv4(),
                    className: "container-inner-row",
                    tag: "tr",
                    style: {
                      height: "100%",
                    },
                    children: Array.from({ length: count }, () =>
                      defaultColNode()
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return defaultRow;
};
