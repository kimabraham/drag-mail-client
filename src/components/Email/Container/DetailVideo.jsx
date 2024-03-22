import { useEffect, useState } from "react";
import useNode from "../../../hooks/useNode";
import { findNodeById } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import {
  convertYoutubeUrlToThumbnail,
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import SelectField from "../../shared/SelectField";
import InputField from "../../shared/InputField";
import { ALIGN_OPTIONS } from "../../../constants/constants";

const DetailVideo = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    videoUrl: "",
    width: "",
    height: "",
    textAlign: "",
    padding: "",
  });

  const row = project.component.find((row) => row.nodeId === id.row);
  const col = findNodeById(row, id.col);
  const td = findNodeById(col, id.td);
  const link = td.children[0];
  const target = link.children[0];

  useEffect(() => {
    if (td && link) {
      const {
        style: { paddingTop },
      } = td;
      const {
        props: { href },
        style: { width, height, textAlign },
      } = link;

      setProperty({
        videoUrl: href || "",
        width: parseInt(width) || "",
        height: parseInt(height) || "",
        textAlign: textAlign || "",
        padding: parseInt(paddingTop) || "",
      });
    }
  }, [link, td]);

  const handleChange = (propertyKey, targetId, value) => {
    let inputProps = {};

    switch (propertyKey) {
      case "videoUrl":
        inputProps = {
          props: {
            ...link.props,
            href: value,
          },
        };
        break;
      case "width":
      case "height":
        inputProps = {
          style: {
            ...link.style,
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
              ...link.style,
              ...align,
              [propertyKey]: value,
            },
          };
        }
        break;
      case "padding":
        inputProps = {
          style: {
            ...td.styles,
            paddingTop: `${value}px`,
            paddingBottom: `${value}px`,
          },
        };
        break;
      default:
        break;
    }

    setProperty((prev) => ({ ...prev, [propertyKey]: value }));
    setProject((prev) => updateProjectComponents(prev, targetId, inputProps));
    debouncedUpdate(updateNode.mutate, { nodeId: targetId, ...inputProps });
  };

  const handleChangeLink = (value) => {
    const thumbnailUrl = convertYoutubeUrlToThumbnail(value);

    const linkProps = {
      props: {
        ...link.props,
        href: value,
      },
    };
    const targetProps = {
      props: {
        ...target.props,
        src: thumbnailUrl,
      },
    };
    setProperty((prev) => ({ ...prev, videoUrl: value }));
    setProject((prev) => updateProjectComponents(prev, link.nodeId, linkProps));
    debouncedUpdate(updateNode.mutate, { nodeId: link.nodeId, ...linkProps });

    setProject((prev) =>
      updateProjectComponents(prev, target.nodeId, targetProps)
    );
    debouncedUpdate(updateNode.mutate, {
      nodeId: target.nodeId,
      ...targetProps,
    });
  };

  return (
    <>
      <InputField
        label="youtube url"
        type="text"
        id="video-url"
        value={property.videoUrl}
        onChange={(e) => handleChangeLink(e.target.value)}
      />
      <InputField
        label="width"
        type="text"
        id="video-width"
        value={property.width}
        onChange={(e) => handleChange("width", link.nodeId, e.target.value)}
      />
      <InputField
        label="height"
        type="text"
        id="video-height"
        value={property.height}
        onChange={(e) => handleChange("height", link.nodeId, e.target.value)}
      />
      <SelectField
        label="textAlign"
        id="video-align"
        value={property.textAlign}
        onChange={(e) => handleChange("textAlign", link.nodeId, e.target.value)}
        options={ALIGN_OPTIONS}
      />
      <InputField
        label="padding y"
        type="text"
        id="video-padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", td.nodeId, e.target.value)}
      />
    </>
  );
};

export default DetailVideo;
