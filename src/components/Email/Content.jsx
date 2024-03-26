import { styled } from "styled-components";
import PropTypes from "prop-types";
import useDraggable from "../../hooks/useDraggable";
import { useRecoilValue } from "recoil";
import { projectInfo } from "../../utils/atoms";

const Table = styled.table`
  width: 600px;
  margin: 100px auto;
  background-color: white;
  min-height: ${(props) => props.height || "100px"};
  border: 1px solid;
  border-collapse: collapse;
  & > tbody {
    height: 100%;
  }
  & .container-row {
    z-index: 1;
    &:hover{
      cursor: pointer;
      box-shadow: 0 0 0 2px #7f8c8d;
    }
  }
  & .content-text-table, .content-image-table, .content-button-table, .content-space-table, .content-social-table, .content-video-table{
    z-index: 10;
    &:hover{
      border: 1px solid red;
    }
  }
`;

const Content = ({ children }) => {
  const project = useRecoilValue(projectInfo);
  const { handleDrop, handleDragOver } = useDraggable();
  const height = project?.component?.length ? "0" : "100px";

  return (
    <Table
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="email-template-table"
      height={height}
    >
      <tbody>{children}</tbody>
    </Table>
  );
};

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
