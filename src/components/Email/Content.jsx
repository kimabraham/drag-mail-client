import { styled } from "styled-components";
import PropTypes from "prop-types";
import useDraggable from "../../hooks/useDraggable";

const Table = styled.table`
  width: 600px;
  margin: 100px auto;
  background-color: white;
  min-height: 100px;
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
  & .content-text-table, .content-image-table, .content-button-table, .content-space-table, .content-social-table, .content-video-table{
    z-index: 10;
    &:hover{
      border: 1px solid red;
    }
  }
`;

const Content = ({ children }) => {
  const { handleDrop, handleDragOver } = useDraggable();

  return (
    <Table
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="email-template-table"
    >
      <tbody>{children}</tbody>
    </Table>
  );
};

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
