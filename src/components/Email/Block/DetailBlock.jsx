import { useRecoilState, useSetRecoilState } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import { updateComponentStyle } from "../../../utils/nodeUtils";
import { styled } from "styled-components";
import { MdDelete } from "react-icons/md";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import useNode from "../../../hooks/useNode";
import BlockProperty from "./BlockProperty";

const Container = styled.div`
     height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  & svg {
    color: #3498db;
    cursor: pointer;
    &:hover {
      color: #2980b9;
    }
  }
  & > h5 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
  }
  & > div {
      display: flex;
      justify-content: space-between;
      padding: 10px;
  }

  & > div:last-child {
    justify-content: space-evenly;
  }
`;

const Property = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    text-transform: uppercase;
    & > div {
        width: 100%;
        display: flex;
        align-items: center;
    }
    & label {
        width: 40%;
        letter-spacing: .5px;
        &::after {
            content: " :"
        }
    }
    & input, & select {
        width: 60%;
        padding: 5px 10px;
        font-size:large;
    }
    & input[type='color'] {
      padding: 0px;
      border: none;
      height: 40px;
    }
    & textarea {
      width: 60%;
      height: 150px;
      font-size:large;
      resize: none;
    }
`;

const DetailBlock = () => {
  const { removeBlock } = useNode();
  const setProject = useSetRecoilState(projectInfo);
  const [id, setId] = useRecoilState(selectBlockId);

  const handleDelete = useCallback(() => {
    let data;
    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id.col,
        (comp) => {
          data = {
            ...comp,
            children: [
              {
                nodeId: uuidv4(),
                tag: "table",
                className: "content-default-table",
                style: {
                  width: "100%",
                  height: "100%",
                  borderCollapse: "collapse",
                  border: "1px dashed #70a1ff",
                },
                children: [],
              },
            ],
          };
          return data;
        }
      );
      return { ...prev, component: updatedComponents };
    });
    setId(null);
    removeBlock.mutate(data);
  }, [id.col, removeBlock, setId, setProject]);

  return (
    <Container>
      <div>
        <h5>Block Property</h5>
        <MdDelete size={25} onClick={handleDelete} />
      </div>
      <Property>
        <BlockProperty />
      </Property>
    </Container>
  );
};

export default DetailBlock;
