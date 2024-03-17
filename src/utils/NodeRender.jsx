import ContentTable from "../components/Email/ContentTable";
import { styled } from "styled-components";

const SelectedRow = styled.table`
  background-color: #ecf0f1;
  box-shadow: 0 0 1px 2px #95a5a6;
`;

const Row = styled.table`
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
      if (
        className.includes("container-inner-row") ||
        className.includes("container-inner-col") ||
        className.includes("content-row") ||
        className.includes("content-col")
      ) {
        const containerId = e.target.closest(".container-table").id;
        onSelectRow(containerId);
      } else {
        onSelectBlock(e);
      }
    };

    if (tag === "img") {
      return (
        <img
          key={nodeId}
          id={nodeId}
          className={className}
          style={style}
          onClick={handleClick}
          {...props} // src와 alt 등의 속성이 여기에 포함됩니다.
        />
      );
    } else if (tag === "hr") {
      return (
        <hr
          key={nodeId}
          id={nodeId}
          className={className}
          style={style}
          onClick={handleClick}
          {...props}
        />
      );
    } else {
      // inner 속성을 사용하는 경우
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
        // 일반적인 태그 처리
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
    }
  };

  return <>{nodes.map((node) => renderNode(node))}</>;
};

export default NodeRenderer;
