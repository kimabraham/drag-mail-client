import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/shared/Logo";
import { styled } from "styled-components";
import { FaCaretDown } from "react-icons/fa";
import Profile from "../components/Profile";
import { PiTextT, PiImage, PiVideoCamera, PiTimerBold } from "react-icons/pi";
import { FiInstagram } from "react-icons/fi";
import { RxButton } from "react-icons/rx";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";

import ContainerCard from "../components/Email/ContainerCard";
import TemplateTitle from "../components/Email/TemplateTitle";
import useAuthStatus from "../hooks/useAuthStatus";
import useGetProject from "../hooks/useGetProject";

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

const StructureList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ecf0f1;
  padding: 20px 30px;
  gap: 15px;
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

const Blocks = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    & > :first-child {
        color: #57606f;
        background-color:#ced6e0;
        display: flex;
        align-items: center;
        gap:10px;
        padding: 5px 15px;
        border-bottom: 1px solid;
    }
    & > :last-child {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: #ecf0f1;
      padding: 30px;
    }
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid #747d8c;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #70a1ff;
  gap:10px;
  & > span {
    color: #747d8c;
    font-size: 15px;
    font-weight: lighter;
    letter-spacing: .5px;
  }
  font-size: larger;
  &:hover {
    border: 1px solid #3742fa;
    box-shadow: 0 0 0 2px #3742fa;
  }
`;

const CreateTemplate = () => {
  useAuthStatus();
  useGetProject();

  const [components, setComponents] = useState([]);
  const screenRef = useRef(null);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [components]);

  console.log(components);

  const handleContainerDragStart = (e) => {
    const target = e.target;
    const id = e.target.childNodes.length;
    e.dataTransfer.setData("text/plain", id);

    const dragImage = target.cloneNode(true);
    dragImage.style.width = "200px";
    dragImage.style.height = "80px";
    dragImage.style.border = "2px solid #3742fa";
    dragImage.style.borderRadius = "15px";
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, target.offsetWidth / 4, 0);

    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleBlockDragStart = (e) => {
    const target = e.target;
    const id = e.target.childNodes.length;

    e.dataTransfer.setData("text/plain", id);

    const dragImage = target.cloneNode(true);

    dragImage.style.width = "100px";
    dragImage.style.height = "100px";
    dragImage.style.border = "2px solid #3742fa";
    dragImage.style.borderRadius = "15px";
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, target.offsetWidth / 2, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const createContainerCards = (id) => {
    return Array.from({ length: id }, (_, index) => (
      <ContainerCard key={index} />
    ));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const newComponents = createContainerCards(id);
    setComponents((prev) => [
      ...prev,
      <div key={prev.length}>{newComponents}</div>,
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBlockDragEnd = (e) => {};

  return (
    <Container>
      <Header>
        <Logo size="50px" />
        <Profile position={{ top: 60, left: 10 }} />
      </Header>
      <Body>
        <Screen ref={screenRef}>
          <TemplateTitle />
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
                onDragStart={(e) => handleContainerDragStart(e)}
              >
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleContainerDragStart(e)}
              >
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleContainerDragStart(e)}
              >
                <div></div>
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleContainerDragStart(e)}
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
              <PiTextT />
              <h5>Blocks</h5>
            </div>
            <div>
              <Row>
                <Card
                  draggable="true"
                  onDragStart={handleBlockDragStart}
                  onDragEnd={handleBlockDragEnd}
                >
                  <PiTextT size={30} />
                  <span>Text</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <PiImage size={30} />
                  <span>Image</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <RxButton size={30} />
                  <span>Button</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <LuAlignVerticalSpaceAround size={30} />
                  <span>Space</span>
                </Card>
              </Row>
              <Row>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <PiVideoCamera size={30} />
                  <span>Video</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <FiInstagram size={30} />
                  <span>Social</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <TfiLayoutMenuSeparated size={30} />
                  <span>Menu</span>
                </Card>
                <Card
                  draggable="true"
                  onDragStart={(e) => handleBlockDragStart(e)}
                >
                  <PiTimerBold size={30} />
                  <span>Timer</span>
                </Card>
              </Row>
            </div>
          </Blocks>
        </Side>
      </Body>
    </Container>
  );
};

export default CreateTemplate;
