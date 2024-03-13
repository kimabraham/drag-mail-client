import { v4 as uuidv4 } from "uuid";
import { defaultColNode } from "./nodes";

export const adjustChildren = (count) => {
  const defaultChild = {
    id: uuidv4(),
    tag: "div",
    className: "container-row",
    style: {
      width: "100%",
      height: "100px",
    },
    children: [],
  };

  defaultChild.children = Array.from({ length: count }, () => ({
    ...defaultChild,
    id: uuidv4(),
    className: "container-column",
    children: [defaultColNode],
  }));

  return defaultChild;
};
