import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import useNode from "../../../hooks/useNode";
import { findNodeById } from "../../../utils/nodeUtils";
import InputField from "../../shared/InputField";
import SelectField from "../../shared/SelectField";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailButton = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    content: "Button",
    backgroundColor: "#1D90FF",
    color: "#ffffff",
    link: "",
    width: "",
    textAlign: "",
    padding: "",
    borderRadius: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const td = findNodeById(row, id.td);
  const target = findNodeById(row, id.target);

  useEffect(() => {
    const {
      inner,
      style: { backgroundColor, color, width, padding, borderRadius },
      props: { href },
    } = target;
    const {
      style: { textAlign },
    } = td;
    if (target) {
      setProperty({
        content: inner,
        backgroundColor: backgroundColor || "#1D90FF",
        color: color || "#ffffff",
        link: href?.replace("http://", "") || "",
        width: parseInt(width) || "",
        textAlign: textAlign || "",
        padding: parseInt(padding) || "",
        borderRadius: parseInt(borderRadius) || "",
      });
    }
  }, [id]);

  const handleChange = useCallback(
    (propertyKey, targetId, value) => {
      let inputProps = {};

      switch (propertyKey) {
        case "content":
          inputProps = {
            inner: value,
          };
          break;
        case "backgroundColor":
        case "color":
          inputProps = {
            style: {
              ...target.style,
              [propertyKey]: value,
            },
          };
          break;
        case "textAlign":
          inputProps = {
            style: {
              ...td.style,
              [propertyKey]: value,
            },
          };
          break;
        case "link":
          inputProps = {
            props: {
              ...target.props,
              href: `http://${value}`,
              target: "_blank",
            },
          };
          break;
        case "width":
          inputProps = {
            style: {
              ...target.style,
              [propertyKey]: `${value}%`,
            },
          };
          break;
        case "padding":
        case "borderRadius":
          inputProps = {
            style: {
              ...target.style,
              [propertyKey]: `${value}px`,
            },
          };
          break;
        default:
          break;
      }

      setProperty((prev) => ({ ...prev, [propertyKey]: value }));
      setProject((prev) => updateProjectComponents(prev, targetId, inputProps));
      debouncedUpdate(updateNode.mutate, { nodeId: targetId, ...inputProps });
    },
    [id]
  );

  return (
    <>
      <InputField
        label="content"
        type="text"
        id="button-content"
        value={property.content}
        onChange={(e) => handleChange("content", id.target, e.target.value)}
      />
      <InputField
        label="background color"
        type="color"
        id="button-bgColor"
        value={property.backgroundColor}
        onChange={(e) =>
          handleChange("backgroundColor", id.target, e.target.value)
        }
      />
      <InputField
        label="font color"
        type="color"
        id="button-color"
        value={property.color}
        onChange={(e) => handleChange("color", id.target, e.target.value)}
      />
      <InputField
        label="link"
        type="text"
        id="button-url"
        value={property.link}
        onChange={(e) => handleChange("link", id.target, e.target.value)}
      />
      <InputField
        label="width"
        type="text"
        id="button-width"
        value={property.width}
        onChange={(e) => handleChange("width", id.target, e.target.value)}
      />
      <SelectField
        label="align"
        id="button-align"
        value={property.textAlign}
        onChange={(e) => handleChange("textAlign", id.td, e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding"
        type="text"
        id="button-padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", id.target, e.target.value)}
      />
      <InputField
        label="border radius"
        type="text"
        id="button-borderR"
        value={property.borderRadius}
        onChange={(e) =>
          handleChange("borderRadius", id.target, e.target.value)
        }
      />
    </>
  );
};

export default DetailButton;
