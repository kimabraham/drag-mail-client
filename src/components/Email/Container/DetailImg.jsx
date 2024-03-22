import { useCallback, useEffect, useState } from "react";
import useNode from "../../../hooks/useNode";
import { findNodeById } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import InputField from "../../shared/InputField";
import SelectField from "../../shared/SelectField";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailImg = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    imgUrl: "",
    width: "",
    align: "",
    padding: "",
    border: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const td = findNodeById(row, id.td);
  const target = findNodeById(row, id.target);

  useEffect(() => {
    if (target) {
      const { src } = target.props;
      const { width, borderRadius } = target.style;
      const { textAlign, paddingTop } = td.style;
      setProperty({
        imgUrl: src || "",
        width: parseInt(width) || "",
        align: textAlign || "",
        padding: parseInt(paddingTop) || "",
        border: parseInt(borderRadius) || "",
      });
    }
  }, [id, project.component]);

  const handlePropertyChange = useCallback(
    (propertyKey, newValue, nodeId, isStyle = false, additionalStyles = {}) => {
      const row = project.component.find(
        (component) => component.nodeId === id.row
      );
      const targetNode = findNodeById(row, id.target);
      const tdNode = findNodeById(row, id.td);

      const target = nodeId === id.target ? targetNode : tdNode;

      const update = isStyle
        ? {
            style: {
              ...target.style,
              [propertyKey]: newValue,
              ...additionalStyles,
            },
          }
        : { props: { ...target.props, [propertyKey]: newValue } };

      setProperty((prev) => ({ ...prev, [propertyKey]: newValue }));
      setProject((prev) => updateProjectComponents(prev, nodeId, update));
      debouncedUpdate(updateNode.mutate, { nodeId, ...update });
    },
    [id, project.component, setProject, updateNode]
  );

  const handlePaddingChange = useCallback(
    (e) => {
      const paddingValue = `${e.target.value}px`;
      handlePropertyChange("paddingTop", paddingValue, id.td, true, {
        paddingBottom: paddingValue,
      });
    },
    [handlePropertyChange, id.td]
  );

  return (
    <>
      <InputField
        label="img url"
        id="image-url"
        value={property.imgUrl}
        onChange={(e) => handlePropertyChange("src", e.target.value, id.target)}
      />
      <InputField
        label="width"
        id="image-width"
        value={property.width}
        onChange={(e) =>
          handlePropertyChange("width", `${e.target.value}%`, id.target, true)
        }
      />
      <SelectField
        label="Align"
        id="image-align"
        value={property.align}
        onChange={(e) =>
          handlePropertyChange("textAlign", e.target.value, id.td, true)
        }
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding"
        id="image-padding"
        value={property.padding}
        onChange={handlePaddingChange}
      />
      <InputField
        label="border radius"
        id="image-border"
        value={property.border}
        onChange={(e) =>
          handlePropertyChange(
            "borderRadius",
            `${e.target.value}px`,
            id.target,
            true
          )
        }
      />
    </>
  );
};

export default DetailImg;
