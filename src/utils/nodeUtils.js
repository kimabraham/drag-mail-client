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
              minHeight: "100px",
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
          src: "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg",
          alt: "cat_img",
        },
        children: [],
      };
    case "button":
      return {
        nodeId: uuidv4(),
        tag: "a",
        className: "content-button-btn",
        style: {
          display: "inline-block",
          textAlign: "center",
          width: "100%",
          padding: "5px 10px",
          border: "none",
          color: "white",
          cursor: "pointer",
          background: "#1e90ff",
          borderRadius: "100px",
        },
        inner: "Button",
        children: [],
      };
    case "space":
      return {
        nodeId: uuidv4(),
        tag: "hr",
        className: "content-hr-hr",
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
        },
        props: {
          href: "https://www.youtube.com/watch?v=lbI5EJ5VXiE",
          target: "_blank",
        },
        children: [
          {
            nodeId: uuidv4(),
            tag: "img",
            className: "content-video-video",
            style: {
              width: "100%",
            },
            props: {
              src: "https://img.youtube.com/vi/lbI5EJ5VXiE/maxresdefault.jpg",
              alt: "video",
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
                      },
                      children: [tagDataByType(type)],
                    },
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                      },
                      children: [tagDataByType(type)],
                    },
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
                      },
                      children: [tagDataByType(type)],
                    },
                  ]
                : [
                    {
                      nodeId: uuidv4(),
                      tag: "td",
                      className: `content-${type}-col`,
                      style: {
                        height: "100%",
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
