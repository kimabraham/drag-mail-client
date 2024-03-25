import { useRecoilState, useRecoilValue } from "recoil";
import useNode from "../../../hooks/useNode";
import { useCallback, useEffect, useState } from "react";
import { isDemo, projectInfo, selectBlockId } from "../../../utils/atoms";
import { findNodeByClassName, findNodeById } from "../../../utils/nodeUtils";
import InputField from "../../shared/InputField";
import SelectField from "../../shared/SelectField";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailSocial = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const demo = useRecoilValue(isDemo);
  const [property, setProperty] = useState({
    instagram: "",
    facebook: "",
    youtube: "",
    width: "",
    align: "",
    padding: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const col = findNodeById(row, id.col);

  useEffect(() => {
    const contentSocialTable = findNodeByClassName(col, "content-social-table");
    const contentSocialRow = findNodeByClassName(
      contentSocialTable,
      "content-social-row"
    );
    const [
      {
        children: [instagram],
      },
      {
        children: [facebook],
      },
      {
        children: [youtube],
      },
    ] = contentSocialRow.children;
    if (contentSocialRow) {
      setProperty({
        instagram: instagram.props.href || "",
        facebook: facebook.props.href || "",
        youtube: youtube.props.href || "",
        width: parseInt(contentSocialTable.style.width) || "",
        align: contentSocialTable.style.textAlign || "",
        padding: parseInt(col.style.paddingTop) || "",
      });
    }
  }, []);

  const handleChange = (propertyKey, value) => {
    let targetId;
    let inputProps;

    switch (propertyKey) {
      case "instagram":
      case "facebook":
      case "youtube":
        {
          const socialLink = findNodeByClassName(
            col,
            `content-social-${propertyKey}`
          );
          targetId = socialLink.nodeId;
          inputProps = {
            props: {
              ...socialLink.props,
              href: value,
            },
          };
        }
        break;
      case "width":
        inputProps = {
          style: {
            ...col.children[0].style,
            width: `${value}%`,
          },
        };
        targetId = col.children[0].nodeId;
        break;
      case "align":
        {
          const align =
            value === "left"
              ? { marginLeft: 0, marginRight: "auto" }
              : value === "center"
              ? { marginLeft: "auto", marginRight: "auto" }
              : { marginLeft: "auto", marginRight: 0 };
          inputProps = {
            style: {
              ...col.children[0].style,
              ...align,
              textAlign: value,
            },
          };
          targetId = col.children[0].nodeId;
        }
        break;
      case "padding":
        inputProps = {
          style: {
            ...col.style,
            paddingTop: `${value}px`,
            paddingBottom: `${value}px`,
          },
        };
        targetId = col.nodeId;
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
      <InputField
        label="Instagram url"
        type="text"
        id="social-instagramUrl"
        name="instagramUrl"
        value={property.instagram}
        onChange={(e) => handleChange("instagram", e.target.value)}
      />
      <InputField
        label="Facebook url"
        type="text"
        id="social-facebookUrl"
        name="facebookUrl"
        value={property.facebook}
        onChange={(e) => handleChange("facebook", e.target.value)}
      />
      <InputField
        label="Youtube url"
        type="text"
        id="social-youtubeUrl"
        name="youtubeUrl"
        value={property.youtube}
        onChange={(e) => handleChange("youtube", e.target.value)}
      />
      <InputField
        label="Width"
        type="text"
        id="social-width"
        value={property.width}
        onChange={(e) => handleChange("width", e.target.value)}
      />
      <SelectField
        label="Align"
        id="social-align"
        value={property.align}
        onChange={(e) => handleChange("align", e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="Padding"
        type="text"
        id="social-padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", e.target.value)}
      />
    </>
  );
};

export default DetailSocial;
