import { useEffect, useState } from "react";
import { findNodeById } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import useNode from "../../../hooks/useNode";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import InputField from "../../shared/InputField";
import SelectField from "../../shared/SelectField";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailText = () => {
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const { updateNode } = useNode();
  const [property, setProperty] = useState({
    content: "",
    size: "",
    color: "",
    textAlign: "",
    padding: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const target = findNodeById(row, id.target);

  useEffect(() => {
    if (target) {
      const {
        inner,
        style: { color, textAlign, paddingTop, fontSize },
      } = target;
      setProperty({
        content: inner?.replace(/<br \/>/g, "\n") || "",
        size: parseInt(fontSize) || "",
        color: color || "#000000",
        textAlign: textAlign || "",
        padding: parseInt(paddingTop) || "",
      });
    }
  }, [id, project.component]);

  const handleChange = (propName, value) => {
    let newProperty = {};
    let inputProp = {};

    switch (propName) {
      case "content":
        inputProp = { inner: value.replace(/\n/g, "<br />") };
        break;
      case "size":
        inputProp = { style: { ...target.style, fontSize: `${value}px` } };
        break;
      case "color":
        inputProp = { style: { ...target.style, color: value } };
        break;
      case "textAlign":
        inputProp = { style: { ...target.style, textAlign: value } };
        break;
      case "padding":
        inputProp = {
          style: {
            ...target.style,
            paddingTop: `${value}px`,
            paddingBottom: `${value}px`,
          },
        };
        break;
      default:
        break;
    }

    newProperty[propName] = value;
    setProperty((prev) => ({ ...prev, ...newProperty }));

    const updatePayload =
      propName === "content"
        ? { nodeId: id.target, ...inputProp }
        : { nodeId: id.target, ...inputProp };
    setProject((prev) => updateProjectComponents(prev, id.target, inputProp));
    debouncedUpdate(updateNode.mutate, updatePayload);
  };

  return (
    <>
      <InputField
        label="content"
        id="text-content"
        value={property.content}
        onChange={(e) => handleChange("content", e.target.value)}
      />
      <InputField
        label="font size"
        id="text-size"
        value={property.size}
        onChange={(e) => handleChange("size", e.target.value)}
      />
      <InputField
        label="font color"
        id="text-color"
        type="color"
        value={property.color}
        onChange={(e) => handleChange("color", e.target.value)}
      />
      <SelectField
        label="Align"
        id="text-align"
        value={property.align}
        onChange={(e) => handleChange("textAlign", e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding"
        id="text-padding"
        type="padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", e.target.value)}
      />
    </>
  );
};

export default DetailText;
