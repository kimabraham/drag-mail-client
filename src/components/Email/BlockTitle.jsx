import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import { selectBlockId } from "../../utils/atoms";
import { FaCaretDown } from "react-icons/fa";

const BlockTitle = () => {
  const [selectedRowId, setSelectedRowId] = useRecoilState(selectBlockId);

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
      <h5>Blocks</h5>
    </div>
  );
};

export default BlockTitle;
