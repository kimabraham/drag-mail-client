import { styled } from "styled-components";
import Logo from "../components/shared/Logo";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  projectInfo,
  selectBlockId,
  selectRowId,
  userInfo,
} from "../utils/atoms";
import TemplateTitle from "../components/Email/TemplateTitle";
import Content from "../components/Email/Content";
import NodeRenderer from "../utils/NodeRender";
import StructureTitle from "../components/Email/StructureTitle";
import StructureList from "../components/Email/StructureList";
import BlockTitle from "../components/Email/BlockTitle";
import BlockList from "../components/Email/BlockList";
import { useEffect } from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    margin: auto;
    & > header {
      width: 100%;
    height:60px;
    border-bottom: 1px solid ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    }
`;

const Body = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
`;

const Side = styled.div`
    width: 25%;
    min-width: 340px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid;
    overflow-y: auto;
    right: 0;
    & > :first-child{
        border-bottom: 1px solid;
    }
`;

const Screen = styled.div`
    width: 75%;
    min-width: 940px;
    background-color: #f1f2f6;
    overflow-y: auto;
`;

const Structures = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  & .back-icon {
    cursor: pointer;
  }
`;

const Blocks = styled(Structures)`
  height: 60%;
`;

const Demo = () => {
  useAuthStatus();
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectInfo);
  const setSelectedRowId = useSetRecoilState(selectRowId);
  const setSelectedBlockId = useSetRecoilState(selectBlockId);
  const user = useRecoilValue(userInfo);

  const handleClick = () => {
    setSelectedBlockId(null);
    setSelectedRowId(null);
  };

  useEffect(() => {
    const localProject = localStorage.getItem("project");
    if (localProject) {
      setProject(JSON.parse(localProject));
    } else {
      localStorage.setItem(
        "project",
        JSON.stringify({
          title: `${new Date().toISOString().slice(0, 19)} Demo`,
          component: [],
        })
      );
    }
  }, [localStorage]);

  useEffect(() => {
    const postDemo = async () => {
      if (user) {
        const res = await axios.post(
          "/api/projects/demo",
          { project },
          { withCredentials: true }
        );
        navigate(`/template/${res.data.project._id}`);
      }
    };
    postDemo();
  }, [user]);

  return (
    <Container>
      <header>
        <Logo size="50px" />
      </header>
      <Body>
        <Screen onClick={handleClick}>
          <TemplateTitle />
          <Content>
            <NodeRenderer />
          </Content>
        </Screen>
        <Side>
          <Structures>
            <StructureTitle />
            <StructureList />
          </Structures>
          <Blocks>
            <BlockTitle />
            <BlockList />
          </Blocks>
        </Side>
      </Body>
    </Container>
  );
};

export default Demo;
