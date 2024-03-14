import PropTypes from "prop-types";
import ContentTable from "../components/Email/ContentTable";

const renderNode = (node) => {
  const { nodeId, tag, className, props, style, children, inner } = node;

  if (tag === "content-table") {
    return <ContentTable key={nodeId} />;
  }

  const TagName = tag;

  const contentProps = inner
    ? { dangerouslySetInnerHTML: { __html: inner } }
    : {};

  const childElements =
    children && children.length > 0
      ? children.map((child) => renderNode(child))
      : null;

  return (
    <TagName
      key={nodeId}
      id={nodeId}
      className={className}
      style={style}
      {...props}
      {...contentProps}
    >
      {childElements}
    </TagName>
  );
};

const NodeRenderer = ({ nodes }) => {
  const content = Array.isArray(nodes)
    ? nodes.map((node) => renderNode(node))
    : renderNode(nodes);

  return <>{content}</>;
};

NodeRenderer.propTypes = {
  nodes: PropTypes.oneOfType([
    PropTypes.shape({
      nodeId: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      className: PropTypes.string,
      props: PropTypes.object,
      style: PropTypes.object,
      children: PropTypes.array,
      inner: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        nodeId: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        className: PropTypes.string,
        props: PropTypes.object,
        style: PropTypes.object,
        children: PropTypes.array,
        inner: PropTypes.string,
      })
    ),
  ]).isRequired,
};

export default NodeRenderer;
