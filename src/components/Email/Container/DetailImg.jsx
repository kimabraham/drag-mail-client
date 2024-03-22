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
    src: "",
    width: "",
    textAlign: "",
    padding: "",
    border: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const td = findNodeById(row, id.td);
  const target = findNodeById(td, id.target);

  useEffect(() => {
    if (target) {
      const { src } = target.props;
      const {
        style: { width, borderRadius },
      } = target;
      const {
        style: { textAlign, paddingTop },
      } = td;

      setProperty({
        src: src || "",
        width: parseInt(width) || "",
        textAlign: textAlign || "",
        padding: parseInt(paddingTop) || "",
        border: parseInt(borderRadius) || "",
      });
    }
  }, [id]);

  const handleChange = useCallback(
    (propertyKey, targetId, value) => {
      let inputProps;

      switch (propertyKey) {
        case "src":
          inputProps = {
            props: {
              ...target.props,
              [propertyKey]: value,
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
                ...td.style,
                ...align,
                [propertyKey]: value,
              },
            };
          }
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
        case "border":
          inputProps = {
            style: {
              ...target.style,
              borderRadius: `${value}px`,
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
        label="img url"
        id="image-url"
        value={property.src}
        onChange={(e) => handleChange("src", id.target, e.target.value)}
      />
      <InputField
        label="width"
        id="image-width"
        value={property.width}
        onChange={(e) => handleChange("width", id.target, e.target.value)}
      />
      <SelectField
        label="Align"
        id="image-align"
        value={property.textAlign}
        onChange={(e) => handleChange("textAlign", id.td, e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding"
        id="image-padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", id.td, e.target.value)}
      />
      <InputField
        label="border radius"
        id="image-border"
        value={property.border}
        onChange={(e) => handleChange("border", id.target, e.target.value)}
      />
    </>
  );
};

export default DetailImg;
