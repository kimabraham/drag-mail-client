import { IoMdArrowRoundBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import { selectBlockId } from "../../utils/atoms";
import { FaCaretDown } from "react-icons/fa";
import { styled } from "styled-components";

const Container = styled.div`
  height: 45px;
  border-bottom: 1px solid;
    display: flex;
    align-items: center;
    gap:10px;
    padding: 12px 15px;
    & > h5 {
      font-size: 18px;
    }
  
`;

const BlockTitle = () => {
  const [selectedRowId, setSelectedRowId] = useRecoilState(selectBlockId);

  return (
    <Container>
      {selectedRowId ? (
        <IoMdArrowRoundBack
          className="back-icon"
          size={20}
          onClick={() => setSelectedRowId(null)}
        />
      ) : (
        <FaCaretDown size={20} />
      )}
      <h5>Blocks</h5>
    </Container>
  );
};

export default BlockTitle;
