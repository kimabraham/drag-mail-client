import { IoMdArrowRoundBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import { selectRowId } from "../../utils/atoms";
import { FaCaretDown } from "react-icons/fa";

const StructureTitle = () => {
  const [selectedRowId, setSelectedRowId] = useRecoilState(selectRowId);

  return (
    <div>
      {selectedRowId ? (
        <IoMdArrowRoundBack
          className="back-icon"
          size={30}
          onClick={() => setSelectedRowId(null)}
        />
      ) : (
        <FaCaretDown size={30} />
      )}
      <h5>Structures</h5>
    </div>
  );
};

export default StructureTitle;
