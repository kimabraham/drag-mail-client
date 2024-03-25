import { styled } from "styled-components";
import { PiTextT, PiImage, PiVideoCamera } from "react-icons/pi";
import { FiInstagram } from "react-icons/fi";
import { RxButton } from "react-icons/rx";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";

import Card from "./Card";
import DetailBlock from "./Block/DetailBlock";
import { selectBlockId } from "../../utils/atoms";
import { useRecoilValue } from "recoil";

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color:#F1F2F6;
	padding: 30px;
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const BlockList = () => {
  const blockId = useRecoilValue(selectBlockId);

  return (
    <>
      {blockId ? (
        <DetailBlock />
      ) : (
        <Container>
          <Row>
            <Card icon={<PiTextT size={25} />} label="Text" />
            <Card icon={<PiImage size={25} />} label="Image" />
            <Card icon={<RxButton size={25} />} label="Button" />
          </Row>
          <Row>
            <Card
              icon={<LuAlignVerticalSpaceAround size={25} />}
              label="Space"
            />
            <Card icon={<PiVideoCamera size={25} />} label="Video" />
            <Card icon={<FiInstagram size={25} />} label="Social" />
          </Row>
        </Container>
      )}
    </>
  );
};

export default BlockList;
