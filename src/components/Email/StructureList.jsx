import { styled } from "styled-components";
import useDraggable from "../../hooks/useDraggable";
import DetailContainer from "./Container/DetailContainer";
import { selectRowId } from "../../utils/atoms";
import { useRecoilValue } from "recoil";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #F1F2F6;
  padding: 20px 30px;
  gap:10px;
`;

const Item = styled.li`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  border: 1px solid #747d8c;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    border: 1px solid #3742fa;
    box-shadow: 0 0 0 2px #3742fa;
  }
  & > div {
    width: 100%;
    border: 1px dashed #074f6d;
  }
`;

const StructureList = () => {
  const { handleDragStart } = useDraggable();
  const rowId = useRecoilValue(selectRowId);

  const createStructureItem = (count) => (
    <Item key={count} draggable="true" onDragStart={handleDragStart}>
      {[...Array(count)].map((_, index) => (
        <div key={index}></div>
      ))}
    </Item>
  );

  return (
    <>
      {rowId ? (
        <DetailContainer />
      ) : (
        <List>
          {Array(4)
            .fill()
            .map((_, index) => createStructureItem(index + 1))}
        </List>
      )}
    </>
  );
};

export default StructureList;
