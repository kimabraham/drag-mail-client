import { styled } from "styled-components";
import Logo from "../components/shared/Logo";
import Profile from "../components/Profile";
import { LuSendHorizonal } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import useProject from "../hooks/useProject";
import Loading from "../components/shared/Loading";
import NodeRenderer from "../utils/NodeRender";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDemo, projectInfo } from "../utils/atoms";
import { Link, useNavigate } from "react-router-dom";

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
      & div:first-child{
        display: flex;
        align-items: center;
        & > a{
          text-transform: uppercase;
          text-decoration: none;
          color: black;
          font-size: large;
          letter-spacing: .5px;
          margin-right: 20px;
          &:hover{
            color: #70a1ff;
            font-weight: bold;
          }
        }
      }
      & > div {
        align-items: center;
        width: 100%;
      }
      & h5 {
        text-align: center;
      }
    }
`;

const Button = styled.button`
    text-transform: uppercase;
    padding: 0 20px;
    position: relative;
    font-size: 18px;
    height: 30px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    background-color: #dfe4ea;
    border: 1px solid;
    border-radius: 20px;
    color: #2f3542;
    &:hover{
        border: 1px solid  #2f3542;
        background-color:  #2f3542;
        color: white;
    }
`;

const Alert = styled.div`
  width: 200px;
  height: 50px;
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 20;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const PreviewTable = styled.table`
  width: 600px;
  margin: 50px auto;
  border: 1px solid;
  border-collapse: collapse;
  & .content-default-table {
    display: none;
  }
  & table, tr, td {
    min-height: 0;
    cursor: default;
  }
`;

const Preview = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { project: data, isLoading } = useProject();
  const [project, setProject] = useRecoilState(projectInfo);
  const demo = useRecoilValue(isDemo);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProject(data);
      const containerTables = document.querySelectorAll(".container-table");
      containerTables.forEach((table) => {
        table.style.minHeight = "0px";
      });
    }
  }, [data, setProject]);

  const handleSend = () => {
    navigate("/dashboard/send", {
      state: { project: project._id, isToMe: true },
    });
  };

  const handleExport = () => {
    const table = document.querySelector(".email-template-table");
    const containerTables = document.querySelectorAll(".container-table");
    const containerRows = document.querySelectorAll(".container-row");
    table.style.width = "600px";

    containerTables.forEach((table) => {
      table.style.minHeight = "0px";
    });

    containerRows.forEach((row) => {
      row.style.boxShadow = "none";
    });

    const tableHtmlWithTableTag = table.outerHTML;

    navigator.clipboard.writeText(tableHtmlWithTableTag).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const nodes = project?.component ?? [];

  if (isLoading || !project) {
    return <Loading />;
  }

  return (
    <Container>
      <header>
        <div>
          <Logo size="50px" />
          <Link onClick={() => navigate(-1)}>back</Link>
        </div>
        <div>
          <h5>{project.title}</h5>
        </div>
        <ProfileBox>
          {!demo && (
            <Button onClick={handleSend}>
              <LuSendHorizonal size={25} />
              send
            </Button>
          )}
          <Button onClick={handleExport}>
            <PiExportBold size={25} />
            export
            {isCopied && <Alert>Copied to clipboard!</Alert>}
          </Button>
          {!demo && <Profile position={{ top: 60, left: 10 }} />}
        </ProfileBox>
      </header>
      <PreviewTable className="email-template-table">
        <tbody>
          <NodeRenderer isPreview={true} />
        </tbody>
      </PreviewTable>
    </Container>
  );
};

export default Preview;
