import { useRecoilValue } from "recoil";
import { BLOCK_TYPES } from "../../../constants/constants";
import { findNodeById } from "../../../utils/nodeUtils";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import DetailImg from "../Container/DetailImg";
import DetailText from "../Container/DetailText";
import { useEffect, useState } from "react";

const BlockProperty = () => {
  const [type, setType] = useState("");
  const [target, setTarget] = useState(null);
  const id = useRecoilValue(selectBlockId);
  const [selectedId, setSelectedId] = useState(id);
  const project = useRecoilValue(projectInfo);

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const foundTarget = findNodeById(row, id.target);
    setTarget(foundTarget);
    if (foundTarget) {
      const determinedType = foundTarget.className.split("-")[1];
      setType(determinedType);

      if (foundTarget.className === "content-image-col") {
        setSelectedId({
          ...id,
          target: foundTarget.children[0].nodeId,
        });
      } else {
        setSelectedId(id);
      }
    }
  }, [id, project.component]);

  if (!target) {
    return null;
  }

  switch (type) {
    case BLOCK_TYPES.IMAGE:
      return <DetailImg id={selectedId} />;
    case BLOCK_TYPES.TEXT:
      return <DetailText id={id} />;
    default:
      return <div>Unsupported block type.</div>;
  }
};

export default BlockProperty;
