import styled from "styled-components";
import PropTypes from "prop-types";

import useDraggable from "../../hooks/useDraggable";

const StyledCard = styled.div`
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

const Card = ({ icon, label }) => {
  const dragStyle = { width: 100, height: 100 };

  const { handleDragStart } = useDraggable(dragStyle);

  return (
    <StyledCard
      className={`${label}-card`}
      draggable="true"
      onDragStart={handleDragStart}
    >
      {icon}
      <span>{label}</span>
    </StyledCard>
  );
};

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default Card;
