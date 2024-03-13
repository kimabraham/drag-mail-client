import { v4 as uuidv4 } from "uuid";

export const defaultColNode = {
  id: uuidv4(),
  tag: "div",
  className: "container-box",
  style: {
    width: "100%",
    height: "100%",
    padding: "10px",
  },
  children: [
    {
      id: uuidv4(),
      tag: "div",
      className: "container-put",
      style: {
        width: "100%",
        height: "100%",
        color: "#70a1ff",
        border: "1px dashed #70a1ff",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      },
      children: [
        {
          id: "icon",
          tag: "BsLayoutWtf",
          iconName: "BsLayoutWtf",
          className: "container-put-icon",
          style: {
            size: 25,
          },
          children: [],
        },
        {
          id: "putText",
          tag: "span",
          className: "container-put-text",
          inner: "Put here block",
          style: {
            fontSize: "12px",
          },
          children: [],
        },
      ],
    },
  ],
};
