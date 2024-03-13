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

import TemplateTitle from "../components/Email/TemplateTitle";
import useAuthStatus from "../hooks/useAuthStatus";
import useGetProject from "../hooks/useGetProject";
import Card from "../components/Email/Card";
import useDraggable from "../hooks/useDraggable";
import NodeRenderer from "../utils/NodeRender";
import { projectInfo } from "../utils/atoms";
import { useRecoilState } from "recoil";
import Loading from "../components/shared/Loading";

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
    min-width: 340px;
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
    min-width: 940px;
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

const CreateTemplate = () => {
  useAuthStatus();
  const { data, isLoading } = useGetProject();

  const screenRef = useRef(null);
  const [project, setProject] = useRecoilState(projectInfo);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [project?.component]);

  const dragStyle = { width: 200, height: 80 };

  const { handleDragStart } = useDraggable(dragStyle);

  const handleDrop = (e) => {
    e.preventDefault();
    const nodeString = e.dataTransfer.getData("text/plain");
    const nodeObject = JSON.parse(nodeString);

    setProject((prevProject) => ({
      ...prevProject,
      component: [...prevProject.component, nodeObject],
    }));
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
        <Screen ref={screenRef}>
          <TemplateTitle />
          <Content onDrop={handleDrop} onDragOver={handleDragOver}>
            <NodeRenderer nodes={data?.component || []} />
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
                onDragStart={(e) => handleDragStart(e)}
              >
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e)}
              >
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e)}
              >
                <div></div>
                <div></div>
                <div></div>
              </StructureItem>
              <StructureItem
                draggable="true"
                onDragStart={(e) => handleDragStart(e)}
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
                <Card icon={<PiTextT size={30} />} label="Text" />
                <Card icon={<PiImage size={30} />} label="Image" />
                <Card icon={<RxButton size={30} />} label="Button" />
                <Card
                  icon={<LuAlignVerticalSpaceAround size={30} />}
                  label="Space"
                />
              </Row>
              <Row>
                <Card icon={<PiVideoCamera size={30} />} label="Video" />
                <Card icon={<FiInstagram size={30} />} label="Social" />
                <Card
                  icon={<TfiLayoutMenuSeparated size={30} />}
                  label="Menu"
                />
                <Card icon={<PiTimerBold size={30} />} label="Timer" />
              </Row>
            </div>
          </Blocks>
        </Side>
      </Body>
    </Container>
  );
};

export default CreateTemplate;
