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
          cursor: "pointer",
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
              padding: "inherit",
            },
            children: [
              {
                nodeId: uuidv4(),
                tag: "tbody",
                className: "container-tbody",
                style: {
                  height: "100%",
                  padding: "inherit",
                },
                children: [
                  {
                    nodeId: uuidv4(),
                    tag: "tr",
                    className: "container-inner-row",
                    style: {
                      height: "100%",
                      padding: "inherit",
                    },
                    children: [
                      {
                        nodeId: uuidv4(),
                        tag: "td",
                        className: "container-inner-col",
                        style: {
                          height: "100%",
                          padding: "inherit",
                        },
                        children: [
                          {
                            nodeId: uuidv4(),
                            tag: "table",
                            className: "content-table",
                            style: {
                              width: "100%",
                              height: "100%",
                              tableLayout: "fixed",
                            },
                            children: [
                              {
                                nodeId: uuidv4(),
                                tag: "tbody",
                                className: "content-body",
                                style: {
                                  height: "100%",
                                  padding: "inherit",
                                },
                                children: [
                                  {
                                    nodeId: uuidv4(),
                                    tag: "tr",
                                    className: "content-row",
                                    style: {
                                      height: "100%",
                                      padding: "inherit",
                                    },
                                    children: Array.from(
                                      { length: count },
                                      () => defaultColNode()
                                    ),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
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

export const adjustBlock = () => {
  const blockTag = {
    nodeId: uuidv4(),
    tag: "table",
    className: "content-text-table",
    style: {
      width: "100%",
      height: "100%",
    },
    children: [
      {
        nodeId: uuidv4(),
        tag: "tbody",
        className: "content-text-tbody",
        style: {
          width: "100%",
          height: "100%",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "tr",
            className: "content-text-row",
            style: {
              width: "100%",
              height: "100%",
            },
            children: [
              {
                nodeId: uuidv4(),
                tag: "td",
                className: "content-text-col",
                style: {
                  width: "100%",
                  height: "100%",
                },
                children: [
                  {
                    nodeId: uuidv4(),
                    tag: "p",
                    className: "content-text-text",
                    style: {
                      width: "100%",
                      height: "100%",
                    },
                    inner: "Text",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return blockTag;
};
