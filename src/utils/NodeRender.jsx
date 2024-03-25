import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import ContentTable from "../components/Email/ContentTable";
import { projectInfo, selectBlockId, selectRowId } from "./atoms";

const Row = styled.table`
  min-height: 0px;
`;

const NodeRenderer = ({ isPreview }) => {
  const project = useRecoilValue(projectInfo);
  const setSelectedRowId = useSetRecoilState(selectRowId);
  const setSelectedBlockId = useSetRecoilState(selectBlockId);
  const renderNode = (node) => {
    const { nodeId, tag, className, props, style, children, inner } = node;

    if (className === "content-default-table") {
      return <ContentTable key={nodeId} {...props} />;
    }

    const TagName = className === "container-table" ? Row : tag;

    const handleClick = (e) => {
      if (!isPreview) {
        e.preventDefault();
      }
      e.stopPropagation();
      if (
        className.includes("container-inner-row") ||
        className.includes("container-inner-col") ||
        className.includes("content-row") ||
        className.includes("content-col")
      ) {
        const containerRow = e.target.closest(".container-row").id;
        const containerCol = e.target.closest(".container-col").id;
        const containerId = e.target.closest(".container-table").id;
        setSelectedBlockId(null);
        setSelectedRowId({
          row: containerRow,
          col: containerCol,
          target: containerId,
        });
      } else {
        const containerRowId = e.target.closest(".container-row").id;
        const contentColId = e.target.closest(".content-col").id;
        const blockId = e.target.closest("td").id;
        setSelectedRowId(null);
        setSelectedBlockId({
          row: containerRowId,
          col: contentColId,
          td: blockId,
          target: e.target.id,
        });
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
          {...props}
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
    }
  };

  return <>{(project?.component ?? []).map((node) => renderNode(node))}</>;
};

export default NodeRenderer;
