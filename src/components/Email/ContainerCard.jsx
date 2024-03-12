import React from "react";
import { BsLayoutWtf } from "react-icons/bs";
import { styled } from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100px;
`;

const Box = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    & > div {
        height: 100%;
        border: 1px dashed #70a1ff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: #70a1ff;
        & > span {
            font-size: 12px;
        }
    }
`;

const ContainerCard = () => {
  return (
    <Container>
      <Box>
        <div>
          <BsLayoutWtf size={25} />
          <span>Put here Blocks</span>
        </div>
      </Box>
    </Container>
  );
};

export default ContainerCard;
