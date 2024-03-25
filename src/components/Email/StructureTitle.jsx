import { IoMdArrowRoundBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import { selectRowId } from "../../utils/atoms";
import { FaCaretDown } from "react-icons/fa";
import { styled } from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid;
    display: flex;
    align-items: center;
    gap:10px;
    padding: 12px 15px;
    & > h5 {
      font-size: 18px;
    }
  
`;

const StructureTitle = () => {
  const [selectedRowId, setSelectedRowId] = useRecoilState(selectRowId);

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
      <h5>Structures</h5>
    </Container>
  );
};

export default StructureTitle;
