import { styled } from "styled-components";
import PropTypes from "prop-types";
import useDraggable from "../../hooks/useDraggable";
import { useRecoilValue } from "recoil";
import { projectDrag } from "../../utils/atoms";

const Table = styled.table`
  width: 600px;
  margin: 100px auto;
  min-height: 100px;
  background-color: white;
  border: 1px solid;
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
  & .content-text-table{
    z-index: 10;
    &:hover{
      border: 1px solid red;
    }
  }
`;

const Content = ({ children }) => {
  const { handleDrop, handleDragOver } = useDraggable();
  const isDrag = useRecoilValue(projectDrag);

  return (
    <Table onDrop={handleDrop} onDragOver={handleDragOver}>
      <tbody>{children}</tbody>
    </Table>
  );
};

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
