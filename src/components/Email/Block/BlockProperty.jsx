import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import DetailImg from "../Container/DetailImg";
import DetailText from "../Container/DetailText";
import DetailButton from "../Container/DetailButton";
import DetailSpace from "../Container/DetailSpace";
import { BLOCK_TYPES } from "../../../constants/constants";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import { findNodeById } from "../../../utils/nodeUtils";

const BlockProperty = () => {
  const [type, setType] = useState("");
  const [target, setTarget] = useState(null);
  const id = useRecoilValue(selectBlockId);
  const project = useRecoilValue(projectInfo);
  const setSelectBlockId = useSetRecoilState(selectBlockId);

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const foundTarget = findNodeById(row, id.target);
    setTarget(foundTarget);
    if (foundTarget) {
      const determinedType = foundTarget.className.split("-")[1];
      setType(determinedType);

      if (
        foundTarget.className === "content-image-col" ||
        foundTarget.className === "content-space-col" ||
        foundTarget.className === "content-button-col"
      ) {
        setSelectBlockId({
          ...id,
          target: foundTarget.children[0].nodeId,
        });
      } else {
        setSelectBlockId(id);
      }
    }
  }, [id, project.component, setSelectBlockId]);

  if (!target) {
    return null;
  }

  switch (type) {
    case BLOCK_TYPES.IMAGE:
      return <DetailImg />;
    case BLOCK_TYPES.TEXT:
      return <DetailText />;
    case BLOCK_TYPES.BUTTON:
      return <DetailButton />;
    case BLOCK_TYPES.SPACE:
      return <DetailSpace />;
    default:
      return <div>Unsupported block type.</div>;
  }
};

export default BlockProperty;
