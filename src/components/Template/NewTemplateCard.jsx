import { styled } from "styled-components";
import { FaPlus } from "react-icons/fa";
import useProjects from "../../hooks/useProjects";

const Template = styled.div`
  width: 180px;
  height: 250px;
  border: 2px solid #555c67;
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #747d8c;
  & > h5, & > svg {
    margin-top: 20px;
    color: white;
  }
  &:hover{
    background-color: white;
    & > h5, & > svg {
      color: #747d8c;
    }
  }
`;

const NewTemplateCard = () => {
  const { createProject } = useProjects();

  const handleCreate = async () => {
    createProject.mutate();
  };

  return (
    <Template onClick={handleCreate}>
      <FaPlus size={40} />
      <h5>New template</h5>
    </Template>
  );
};

export default NewTemplateCard;
