import { useEffect } from "react";
import { styled } from "styled-components";

import Profile from "../components/Profile";
import Logo from "../components/shared/Logo";
import TemplateTitle from "../components/Email/TemplateTitle";
import StructureList from "../components/Email/StructureList";
import BlockList from "../components/Email/BlockList";

import Content from "../components/Email/Content";
import useAuthStatus from "../hooks/useAuthStatus";
import NodeRenderer from "../utils/NodeRender";
import StructureTitle from "../components/Email/StructureTitle";
import BlockTitle from "../components/Email/BlockTitle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectInfo, selectBlockId, selectRowId } from "../utils/atoms";
import useProject from "../hooks/useProject";
import Loading from "../components/shared/Loading";

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
    width: 30%;
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
    width: 70%;
    min-width: 940px;
    background-color: #f1f2f6;
    overflow-y: auto;
`;

const Structures = styled.div`
    display: flex;
    height: 40%;
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
    & .back-icon {
      cursor: pointer;
    }
`;

const Blocks = styled(Structures)`
  height: 60%;
`;

const CreateTemplate = () => {
  useAuthStatus();
  const setProject = useSetRecoilState(projectInfo);
  const setSelectedRowId = useSetRecoilState(selectRowId);
  const setSelectedBlockId = useSetRecoilState(selectBlockId);
  const { project, isLoading, isFetching } = useProject();

  useEffect(() => {
    if (!isLoading) {
      setProject(project);
    }
  }, [project]);

  useEffect(() => {
    return () => {
      setSelectedRowId(null);
      setSelectedBlockId(null);
      setProject(null);
    };
  }, [setSelectedRowId, setSelectedBlockId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <Logo size="50px" />
        <Profile position={{ top: 60, left: 10 }} />
      </header>
      <Body>
        <Screen>
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

export default CreateTemplate;
