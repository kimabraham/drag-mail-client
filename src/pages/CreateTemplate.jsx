import React from "react";
import Logo from "../components/shared/Logo";
import { styled } from "styled-components";
import { FaCaretDown } from "react-icons/fa";

const Container = styled.div`
    margin: auto;

`;

const Header = styled.header`
    width: 100%;
    height:60px;
    border-bottom: 1px solid ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
`;

const Body = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
`;

const Side = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid;
    & > div{
        height: 50%;
    }
    & > :first-child{
        border-bottom: 1px solid;
    }
`;

const Screen = styled.div`
    width: 70%;
    background-color: #f1f2f6;
`;

const Structures = styled.div`
    display: flex;
    flex-direction: column;
    & > :first-child {
        color: #57606f;
        background-color: #ced6e0;
        display: flex;
        align-items: center;
        gap:10px;
        padding: 5px 15px;
        border-bottom: 1px solid;
    }
`;

const Blocks = styled.div`
    display: flex;
    flex-direction: column;
    & > :first-child {
        color: #57606f;
        background-color:#ced6e0;
        display: flex;
        align-items: center;
        gap:10px;
        padding: 5px 15px;
        border-bottom: 1px solid;
    }
`;

const Row = styled.div``;
const Card = styled.div``;

const CreateTemplate = () => {
  return (
    <Container>
      <Header>
        <Logo size="50px" />
        <h5>Abraham Kim</h5>
      </Header>
      <Body>
        <Screen></Screen>
        <Side>
          <Structures>
            <div>
              <FaCaretDown size={30} />
              <h5>Structures</h5>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Structures>
          <Blocks>
            <div>
              <FaCaretDown size={30} />
              <h5>Blocks</h5>
            </div>
            <div>
              <Row>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
              </Row>
              <Row>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
              </Row>
            </div>
          </Blocks>
        </Side>
      </Body>
    </Container>
  );
};

export default CreateTemplate;
