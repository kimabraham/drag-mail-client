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

export const tagDataByType = (type) => {
  switch (type) {
    case "text":
      return {
        nodeId: uuidv4(),
        tag: "p",
        className: "content-text-p",
        style: {
          width: "100%",
          height: "100%",
          wordBreak: "break-word",
        },
        inner: "Text",
        children: [],
      };
    case "image":
      return {
        nodeId: uuidv4(),
        tag: "img",
        className: "content-image-img",
        style: {
          width: "100%",
          height: "100%",
        },
        props: {
          src: "https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-img-file-document-icon-png-image_892886.jpg",
          alt: "cat_img",
        },
        children: [],
      };
    case "button":
      return {
        nodeId: uuidv4(),
        tag: "a",
        className: "content-button-btn",
        props: {
          href: "",
        },
        style: {
          display: "inline-block",
          textAlign: "center",
          width: "100%",
          padding: "5px 10px",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          backgroundColor: "#1e90ff",
          borderRadius: "100px",
          textDecoration: "none",
        },
        inner: "Button",
        children: [],
      };
    case "space":
      return {
        nodeId: uuidv4(),
        tag: "hr",
        className: "content-space-hr",
        style: {
          textAlign: "center",
          width: "100%",
        },
        children: [],
      };
    case "video":
      return {
        nodeId: uuidv4(),
        tag: "a",
        className: "content-video-video",
        style: {
          width: "100%",
          position: "relative",
          display: "block",
        },
        props: {
          href: "",
          target: "_blank",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "img",
            className: "content-video-img",
            style: {
              width: "100%",
              height: "100%",
            },
            props: {
              src: "https://img.youtube.com",
              alt: "video",
            },
            children: [],
          },
          {
            nodeId: uuidv4(),
            tag: "img",
            className: "content-video-btn",
            style: {
              width: "40px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            },
            props: {
              src: "https://cdn.pixabay.com/photo/2016/07/03/18/36/youtube-1495277_1280.png",
              alt: "play_button",
            },
            children: [],
          },
        ],
      };
    case "social":
      return {
        nodeId: uuidv4(),
        tag: "a",
        className: "content-social-social",
        style: {
          display: "block",
          width: "100%",
          padding: "5px",
        },
        props: {
          href: "http://www.naver.com",
          target: "_blank",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "img",
            className: "content-social-icon",
            props: {
              src: "https://eejfihr.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png",
              alt: "insta-icon",
            },
            style: {
              width: "100%",
            },
            children: [],
          },
        ],
      };
    default:
      break;
  }
};

export const adjustBlock = (type) => {
  const blockTag = {
    nodeId: uuidv4(),
    tag: "table",
    className: `content-${type}-table`,
    style: {
      width: "100%",
      height: "100%",
    },
    children: [
      {
        nodeId: uuidv4(),
        tag: "tbody",
        className: `content-${type}-tbody`,
        style: {
          width: "100%",
          height: "100%",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "tr",
            className: `content-${type}-row`,
            style: {
              width: "100%",
              height: "100%",
            },
            children:
              type === "social"
                ? [
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                        verticalAlign: "middle",
                        padding: "5px",
                      },
                      children: [
                        {
                          nodeId: uuidv4(),
                          tag: "img",
                          className: "content-social-icon",
                          props: {
                            src: "https://eejfihr.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png",
                            alt: "insta-icon",
                          },
                          style: {
                            width: "100%",
                          },
                          children: [],
                        },
                      ],
                    },
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                        verticalAlign: "middle",
                        padding: "5px",
                      },
                      children: [
                        {
                          nodeId: uuidv4(),
                          tag: "img",
                          className: "content-social-icon",
                          props: {
                            src: "https://eejfihr.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png",
                            alt: "insta-icon",
                          },
                          style: {
                            width: "100%",
                          },
                          children: [],
                        },
                      ],
                    },
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                        verticalAlign: "middle",
                        padding: "5px",
                      },
                      children: [
                        {
                          nodeId: uuidv4(),
                          tag: "img",
                          className: "content-social-icon",
                          props: {
                            src: "https://eejfihr.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png",
                            alt: "insta-icon",
                          },
                          style: {
                            width: "100%",
                          },
                          children: [],
                        },
                      ],
                    },
                  ]
                : [
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                        verticalAlign: "middle",
                      },
                      children: [tagDataByType(type)],
                    },
                  ],
          },
        ],
      },
    ],
  };

  return blockTag;
};

export const insertIntoNodeObject = (
  target,
  className,
  colIndex,
  nodeObject
) => {
  if (!target || !target.children) {
    return false;
  }

  for (const child of target.children) {
    if (child.className === className) {
      if (child.children && child.children.length > colIndex) {
        child.children[colIndex].children.splice(0, 1, nodeObject);
        return true;
      }
      return false;
    }

    const inserted = insertIntoNodeObject(
      child,
      className,
      colIndex,
      nodeObject
    );

    if (inserted) {
      return true;
    }
  }

  return false;
};

export const findNodeById = (node, targetNodeId) => {
  if (node.nodeId === targetNodeId) {
    return node;
  }

  if (node.children) {
    for (let child of node.children) {
      const found = findNodeById(child, targetNodeId);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

export const updateComponentStyle = (components, nodeId, updateFn) => {
  return components.map((comp) => {
    if (comp.nodeId === nodeId) {
      return updateFn(comp);
    } else if (comp.children) {
      const updatedChildren = updateComponentStyle(
        comp.children,
        nodeId,
        updateFn
      );
      return { ...comp, children: updatedChildren };
    }
    return comp;
  });
};
