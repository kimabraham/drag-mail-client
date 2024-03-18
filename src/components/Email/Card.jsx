import styled from "styled-components";
import PropTypes from "prop-types";
import { BLOCK_CARD_HEIGHT, BLOCK_CARD_WIDTH } from "../../constants/constants";
import { useSetRecoilState } from "recoil";
import { projectDrag } from "../../utils/atoms";
import { adjustBlock } from "../../utils/nodeUtils";

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
  const setProjectDrag = useSetRecoilState(projectDrag);

  const handleDragStart = (e) => {
    setProjectDrag(false);
    const cardClassList = e.target.classList;
    const cardType = cardClassList[cardClassList.length - 1]
      .split("-")[0]
      .toLowerCase();

    const nodeString = JSON.stringify(adjustBlock(cardType));
    e.dataTransfer.setData("text/plain", nodeString);

    const dragImage = e.target.cloneNode(true);

    dragImage.style.width = `${BLOCK_CARD_WIDTH}px`;
    dragImage.style.height = `${BLOCK_CARD_HEIGHT}px`;
    dragImage.style.border = "2px solid #3742fa";
    dragImage.style.borderRadius = "15px";

    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, BLOCK_CARD_WIDTH / 2, 0);

    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

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
