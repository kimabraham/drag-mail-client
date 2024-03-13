import React from "react";
import { BsLayoutWtf } from "react-icons/bs";

const iconMapping = {
  BsLayoutWtf: BsLayoutWtf,
};

const renderNode = (node) => {
  const Component = iconMapping[node.tag] || node.tag;

  const props = {
    key: node.id,
    id: node.id,
    className: node.className,
    size: node.style.size,
    style: node.style,
  };

  const children = node.inner
    ? node.inner
    : node.children && node.children.length > 0
    ? node.children.map((child) => renderNode(child))
    : null;

  return React.createElement(Component, props, children);
};

const NodeRenderer = ({ nodes }) => {
  return <>{nodes.map((node) => renderNode(node))}</>;
};

export default NodeRenderer;
