import PropTypes from "prop-types";
import { styled } from "styled-components";
import useDraggable from "../../hooks/useDraggable";
import DetailContainer from "./Container/DetailContainer";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ecf0f1;
  padding: 20px 30px;
  gap: 15px;
`;

const Item = styled.li`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  height: 100%;
  padding: 15px;
  border: 1px solid #747d8c;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    border: 1px solid #3742fa;
    box-shadow: 0 0 0 2px #3742fa;
  }
  & > div {
    width: 100%;
    border: 1px dashed #70a1ff;
  }
`;

const StructureList = ({ rowId, onSetId }) => {
  const { handleDragStart } = useDraggable();

  const createStructureItem = (count) => (
    <Item key={count} draggable="true" onDragStart={handleDragStart}>
      {[...Array(count)].map((_, index) => (
        <div key={index}></div>
      ))}
    </Item>
  );

  return (
    <List>
      {rowId ? (
        <DetailContainer id={rowId} setId={onSetId} />
      ) : (
        Array(4)
          .fill()
          .map((_, index) => createStructureItem(index + 1))
      )}
    </List>
  );
};

StructureList.propTypes = {
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  onSetId: PropTypes.func.isRequired,
};

export default StructureList;
