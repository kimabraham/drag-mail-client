import { useEffect, useState } from "react";
import { findNodeById } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDemo, projectInfo, selectBlockId } from "../../../utils/atoms";
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
  const demo = useRecoilValue(isDemo);
  const [property, setProperty] = useState({
    content: "",
    size: "",
    color: "",
    textAlign: "",
    padding: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const td = findNodeById(row, id.td);
  const target = findNodeById(td, id.target);

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
  }, []);

  const handleChange = (propertyKey, targetId, value) => {
    let inputProps = {};

    switch (propertyKey) {
      case "content":
        inputProps = { inner: value.replace(/\n/g, "<br />") };
        break;
      case "size":
        inputProps = {
          style: {
            ...target.style,
            fontSize: `${value}px`,
            lineHeight: `${value * 1.4}px`,
          },
        };
        break;
      case "color":
        inputProps = { style: { ...target.style, color: value } };
        break;
      case "textAlign":
        inputProps = { style: { ...target.style, textAlign: value } };
        break;
      case "padding":
        inputProps = {
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

    setProperty((prev) => ({ ...prev, [propertyKey]: value }));
    setProject((prev) =>
      updateProjectComponents(prev, targetId, inputProps, demo)
    );
    if (!demo) {
      debouncedUpdate(updateNode.mutate, { nodeId: targetId, ...inputProps });
    }
  };

  return (
    <>
      <div>
        <label htmlFor="text-content">Content</label>
        <textarea
          name="text-content"
          id="text-content"
          cols="30"
          rows="10"
          value={property.content}
          onChange={(e) => handleChange("content", id.target, e.target.value)}
        ></textarea>
      </div>
      <InputField
        label="Font size"
        id="text-size"
        value={property.size}
        onChange={(e) => handleChange("size", id.target, e.target.value)}
      />
      <InputField
        label="Font color"
        id="text-color"
        type="color"
        value={property.color}
        onChange={(e) => handleChange("color", id.target, e.target.value)}
      />
      <SelectField
        label="Align"
        id="text-align"
        value={property.textAlign}
        onChange={(e) => handleChange("textAlign", id.target, e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="Padding"
        id="text-padding"
        type="padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", id.target, e.target.value)}
      />
    </>
  );
};

export default DetailText;
