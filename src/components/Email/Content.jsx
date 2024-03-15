import { styled } from "styled-components";
import PropTypes from "prop-types";
import useDraggable from "../../hooks/useDraggable";

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
    &:hover{
      cursor: pointer;
      box-shadow: 0 0 0 2px #7f8c8d;
    }
  }
`;

const Content = ({ children }) => {
  const { handleDrop, handleDragOver } = useDraggable();

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
