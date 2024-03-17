import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IoIosSave } from "react-icons/io";
import { IoCodeSlashSharp } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";

import { projectInfo } from "../../utils/atoms";
import useProject from "../../hooks/useProject";
import { useState } from "react";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    background-color: #a4b0be;
    border-bottom: 1px solid;
    & > form {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        & > label {
            font-size: larger;
            text-transform: uppercase;
            letter-spacing: .5px;
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
            background-color: #dfe4ea;
            border-radius: 20px;
        }
    }
    & > div {
        display: flex;
        gap: 10px;
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

const TemplateTitle = () => {
  const [project, setProject] = useRecoilState(projectInfo);
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

  const handleSend = () => {
    navigate("/dashboard/send", {
      state: { project: project._id, isToMe: true },
    });
  };
  const handlePreview = () => {
    navigate(`/preview/${project._id}`);
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="templateName">Title</label>
        <input
          type="text"
          id="templateName"
          value={project.title}
          onChange={handleTitleChange}
        />
        <Button type="submit">
          <IoIosSave size={25} />
        </Button>
      </form>
      <div>
        <Button>
          <IoCodeSlashSharp size={25} />
        </Button>
        <Button onClick={handlePreview}>
          <MdOutlinePreview size={25} />
          preview
        </Button>
        <Button onClick={handleSend}>
          <LuSendHorizonal size={25} />
          send
        </Button>
        <Button onClick={handleExport}>
          <PiExportBold size={25} />
          export
          {isCopied && <Alert>Copied to clipboard!</Alert>}
        </Button>
      </div>
    </Container>
  );
};

export default TemplateTitle;
