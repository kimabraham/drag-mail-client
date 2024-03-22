import { useCallback, useEffect, useState } from "react";
import { findNodeById } from "../../../utils/nodeUtils";
import useNode from "../../../hooks/useNode";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import SelectField from "../../shared/SelectField";
import InputField from "../../shared/InputField";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailSpace = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    width: "",
    height: "",
    textAlign: "",
    padding: "",
    border: "",
    borderColor: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const td = findNodeById(row, id.td);
    const target = findNodeById(td, id.target);

    if (target) {
      const {
        style: {
          width,
          borderTopWidth,
          borderTopStyle,
          textAlign,
          borderTopColor,
        },
      } = target;

      const {
        style: { paddingTop },
      } = td;

      setProperty({
        width: parseInt(width) || "",
        height: parseInt(borderTopWidth) || "",
        textAlign: textAlign || "",
        padding: parseInt(paddingTop) || "",
        border: borderTopStyle || "",
        borderColor: borderTopColor || "",
      });
    }
  }, [id, project.component]);

  const handleChange = useCallback(
    (propertyKey, targetId, value) => {
      let inputProps = {};

      const row = project.component.find((row) => row.nodeId === id.row);
      const td = findNodeById(row, id.td);
      const target = findNodeById(row, targetId);

      switch (propertyKey) {
        case "width":
          inputProps = {
            style: {
              ...target.style,
              [propertyKey]: `${value}%`,
            },
          };
          break;
        case "height":
          inputProps = {
            style: {
              ...target.style,
              borderTopWidth: `${value}px`,
            },
          };
          break;
        case "padding":
          inputProps = {
            style: {
              ...td.style,
              paddingTop: `${value}px`,
              paddingBottom: `${value}px`,
            },
          };
          break;
        case "textAlign":
          {
            const align =
              value === "left"
                ? { marginLeft: 0, marginRight: "auto" }
                : value === "center"
                ? { marginLeft: "auto", marginRight: "auto" }
                : { marginLeft: "auto", marginRight: 0 };
            inputProps = {
              style: {
                ...target.style,
                ...align,
                [propertyKey]: value,
              },
            };
          }
          break;
        case "border":
          inputProps = {
            style: {
              ...target.style,
              borderTopStyle: value,
            },
          };
          break;
        case "borderColor":
          inputProps = {
            style: {
              ...target.style,
              borderTopColor: value,
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
        label="width"
        type="text"
        id="space-width"
        value={property.width}
        onChange={(e) => handleChange("width", id.target, e.target.value)}
      />
      <InputField
        label="height"
        type="text"
        id="space-height"
        value={property.height}
        onChange={(e) => handleChange("height", id.target, e.target.value)}
      />
      <SelectField
        label="align"
        id="space-align"
        value={property.textAlign}
        onChange={(e) => handleChange("textAlign", id.target, e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding"
        type="text"
        id="space-padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", id.td, e.target.value)}
      />
      <SelectField
        label="border"
        id="space-border"
        value={property.border}
        onChange={(e) => handleChange("border", id.target, e.target.value)}
        options={[
          { label: "Solid", value: "solid" },
          { label: "Dotted", value: "dotted" },
          { label: "Dashed", value: "dashed" },
        ]}
      />
      <InputField
        label="border color"
        type="color"
        id="space-borderColor"
        value={property.borderColor}
        onChange={(e) => handleChange("borderColor", id.target, e.target.value)}
      />
    </>
  );
};

export default DetailSpace;
