import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoIosSave } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";

import { isDemo, projectInfo } from "../../utils/atoms";
import useProject from "../../hooks/useProject";
import { useState } from "react";

const Container = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    background-color: white;
    border-bottom: 1px solid;
    & > form {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        & > label {
            font-size: 16px;
            &::after{
                content:" :"
            }
        }
        & > input {
            width: 60%;
            padding: 4px 10px;
            letter-spacing: .5px;
            font-size: 16px;
            border:1px solid;
            border-radius: 5px;
        }
    }
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
`;

const Button = styled.button`
    background-color: white;
    padding: 0 20px;
    position: relative;
    font-size: 15px;
    letter-spacing: .2px;
    height: 30px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    &:hover{
      border: 1px solid  #053448;
      background-color:  #053448;
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

const TemplateTitle = () => {
  const [project, setProject] = useRecoilState(projectInfo);
  const demo = useRecoilValue(isDemo);

  const [isCopied, setIsCopied] = useState(false);
  const { id: projectId } = useParams();
  const { updateProject } = useProject();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject.mutate({ projectId, project });
  };

  const handleTitleChange = (e) => {
    setProject({ ...project, title: e.target.value });
  };

  const handleSend = async () => {
    if (demo) {
      window.open("/api/auth/demo", "_self");
    } else {
      navigate("/dashboard/send", {
        state: { project: project._id, isToMe: true },
      });
    }
  };

  const handlePreview = () => {
    if (demo) {
      navigate(`/preview/demo`);
    } else {
      navigate(`/preview/${project._id}`);
    }
  };

  const handleExport = () => {
    const table = document.querySelector(".email-template-table");
    const containerRows = document.querySelectorAll(".container-row");
    table.style.width = "600px";

    containerRows.forEach((row) => {
      row.style.boxShadow = "none";
    });

    const tableHtmlWithTableTag = table.outerHTML;

    navigator.clipboard.writeText(tableHtmlWithTableTag).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <Container>
      {demo ? (
        <div></div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="templateName">Title</label>
          <input
            type="text"
            id="templateName"
            value={project?.title || ""}
            onChange={handleTitleChange}
          />
          <Button type="submit">
            <IoIosSave size={20} />
          </Button>
        </form>
      )}
      <div>
        <Button onClick={handlePreview}>
          <MdOutlinePreview size={20} />
          Preview
        </Button>
        <Button onClick={handleSend}>
          <LuSendHorizonal size={20} />
          Send
        </Button>
        <Button onClick={handleExport}>
          <PiExportBold size={20} />
          Export
          {isCopied && <Alert>Copied to clipboard!</Alert>}
        </Button>
      </div>
    </Container>
  );
};

export default TemplateTitle;
