import { styled } from "styled-components";
import { FcTemplate } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Template = styled.div`
  width: 180px;
  height: 250px;
  color: white;
  border: 2px solid #5352ed;
  background-color: #70a1ff;
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: transparent;
    color: #3742fa;
  }
  & > svg {
    margin-top: auto;
  }
  & > h5 {
    margin-top: 20px;
  }
  & > span {
    margin-top: 10px;
  }
  & > button {
    font-size: large;
    letter-spacing: .4px;
    text-transform:uppercase;
    padding: 8px 35px;
    margin-top: auto;
    margin-bottom: 10px;
    border: 2px solid #3742fa;
    color :#3742fa;
    border-radius: 10px;
    background-color: transparent;
    cursor: pointer;
    &:hover{
      background-color: #3742fa;
      color: white;
    }
  }
`;

const TemplateCard = ({ template, deleteProject }) => {
  const navigate = useNavigate();
  const { _id, title, createdAt } = template;

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteProject();
  };

  return (
    <Template onClick={() => navigate(`/template/${_id}`)}>
      <FcTemplate size={50} />
      <h5>{title}</h5>
      <span>{createdAt.slice(0, 10)}</span>
      <button onClick={handleDelete}>delete</button>
    </Template>
  );
};

export default TemplateCard;
