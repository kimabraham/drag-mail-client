import PropTypes from "prop-types";
import ContentTable from "../components/Email/ContentTable";
import { styled } from "styled-components";

const SelectedRow = styled.table`
  background-color: #ecf0f1;
  cursor: pointer;
  box-shadow: 0 0 1px 2px #95a5a6;
`;

const Row = styled.table`
  cursor: pointer;
`;

const NodeRenderer = ({ nodes, selectedRowId, onSelectRow, onSelectBlock }) => {
  const renderNode = (node) => {
    const { nodeId, tag, className, props, style, children, inner } = node;

    if (className === "content-default-table") {
      return <ContentTable key={nodeId} {...props} />;
    }

    const TagName =
      className === "container-table"
        ? selectedRowId === nodeId
          ? SelectedRow
          : Row
        : tag;

    const handleClick = (e) => {
      if (className.includes("content-col")) {
        const containerId = e.target.closest(".container-table").id;
        onSelectRow(containerId);
      } else {
        onSelectBlock(e);
      }
    };

    const contentProps = inner
      ? { dangerouslySetInnerHTML: { __html: inner } }
      : {};

    if (inner) {
      return (
        <TagName
          key={nodeId}
          id={nodeId}
          className={className}
          style={style}
          onClick={handleClick}
          {...props}
          dangerouslySetInnerHTML={{ __html: inner }}
        />
      );
    } else {
      return (
        <TagName
          key={nodeId}
          id={nodeId}
          className={className}
          style={style}
          onClick={handleClick}
          {...props}
        >
          {children && children.map((child) => renderNode(child))}
        </TagName>
      );
    }
  };

  return <>{nodes.map((node) => renderNode(node))}</>;
};

NodeRenderer.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      nodeId: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      className: PropTypes.string,
      props: PropTypes.object,
      style: PropTypes.object,
      children: PropTypes.array,
      inner: PropTypes.string,
    })
  ).isRequired,
  selectedRowId: PropTypes.string,
  onSelectRow: PropTypes.func.isRequired,
};

export default NodeRenderer;
