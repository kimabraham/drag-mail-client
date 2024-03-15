import { styled } from "styled-components";
import { PiTextT, PiImage, PiVideoCamera, PiTimerBold } from "react-icons/pi";
import { FiInstagram } from "react-icons/fi";
import { RxButton } from "react-icons/rx";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import PropTypes from "prop-types";

import Card from "./Card";

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: #ecf0f1;
	padding: 30px;
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const BlockList = () => {
  return (
    <Container>
      <Row>
        <Card icon={<PiTextT size={30} />} label="Text" />
        <Card icon={<PiImage size={30} />} label="Image" />
        <Card icon={<RxButton size={30} />} label="Button" />
        <Card icon={<LuAlignVerticalSpaceAround size={30} />} label="Space" />
      </Row>
      <Row>
        <Card icon={<PiVideoCamera size={30} />} label="Video" />
        <Card icon={<FiInstagram size={30} />} label="Social" />
        <Card icon={<TfiLayoutMenuSeparated size={30} />} label="Menu" />
        <Card icon={<PiTimerBold size={30} />} label="Timer" />
      </Row>
    </Container>
  );
};

export default BlockList;
