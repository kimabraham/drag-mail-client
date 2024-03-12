import Logo from "../components/shared/Logo";
import { styled } from "styled-components";
import { FaCaretDown } from "react-icons/fa";
import Profile from "../components/Profile";
import React, { useState } from "react";
import { BsLayoutWtf } from "react-icons/bs";
import ContainerCard from "../components/Email/ContainerCard";

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
    padding: 0px 50px;
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
    overflow-y: auto;
    right: 0;
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
    overflow-y: auto;
`;

const Content = styled.div`
      width: 600px;
      margin: 100px auto;
      min-height: 100px;
      background-color: white;
      border: 1px solid;
      & > div {
        display: flex;
      }
      & > div:last-child > div {
        padding-bottom: 10px;
      }
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

const StructureList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ecf0f1;
  padding: 20px 30px;
  gap: 20px;
`;

const StructureItem = styled.li`
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

const Row = styled.div``;
const Card = styled.div``;

const CreateTemplate = () => {
  const [components, setComponents] = useState([]);

  const handleDragStart = (e, id) => {
    const target = e.target;
    e.dataTransfer.setData("text/plain", id);

    const dragImage = target.cloneNode(true);
    dragImage.style.width = "200px";
    dragImage.style.height = "80px";
    dragImage.style.border = "2px solid #3742fa";
    dragImage.style.borderRadius = "15px"; // 원하는 스타일 적용
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, target.offsetWidth / 4, 0);

    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const newComponent = (
      <div key={components.length}>
        <ContainerCard />
        {id === "two" && <ContainerCard />}
        {id === "three" && (
          <>
            <ContainerCard />
            <ContainerCard />
          </>
        )}
        {id === "four" && (
          <>
            <ContainerCard />
            <ContainerCard />
            <ContainerCard />
          </>
        )}
      </div>
    );

    setComponents([...components, newComponent]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Header>
        <Logo size="50px" />
        <Profile position={{ top: 60, left: 10 }} />
      </Header>
      <Body>
        <Screen>
          <Content onDrop={handleDrop} onDragOver={handleDragOver}>
            {components.map((Component, index) => (
              <React.Fragment key={index}>{Component}</React.Fragment>
            ))}
          </Content>
        </Screen>
        <Side>
          <Structures>
            <div>
              <FaCaretDown size={30} />
              <h5>Structures</h5>
            </div>
            <StructureList>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e, "one")}
              >
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e, "two")}
              >
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e, "three")}
              >
                <div></div>
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e, "four")}
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </StructureItem>
            </StructureList>
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
