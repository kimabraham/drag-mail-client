import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { projectInfo, selectRowId } from "../../../utils/atoms";
import { styled } from "styled-components";
import { MdDelete } from "react-icons/md";

import useProject from "../../../hooks/useProject";
import { useParams } from "react-router-dom";
import { PATCH_PROJECT_TYPES } from "../../../constants/constants";
import useNode from "../../../hooks/useNode";
import { findNodeById } from "../../../utils/nodeUtils";
import {
  debouncedUpdate,
  updateProjectComponents,
} from "../../../utils/detailBlocks";
import InputField from "../../shared/InputField";

const Container = styled.div`
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  & svg {
    color: #3498db;
    cursor: pointer;
    &:hover {
      color: #2980b9;
    }
  }
  & > h5 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  }
  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    & label {
      width: 50%;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: .5px;
      &::after {
        content: " :";
      }
    }
    & input {
      width: 50%;
      padding: 5px 10px;
      font-size: large;
    }
    & input[type='color'] {
      padding: 0px;
      border: none;
      height: 40px;
    }
  }
`;

const DetailContainer = () => {
  const { id: projectId } = useParams();
  const project = useRecoilValue(projectInfo);
  const setProject = useSetRecoilState(projectInfo);
  const [id, setId] = useRecoilState(selectRowId);
  const { updateNode } = useNode();
  const { patchProject } = useProject();

  const [property, setProperty] = useState({
    bgColor: "#ffffff",
    bgImg: "",
    padding: "",
    radius: "",
  });

  const row = project.component?.find((row) => row.nodeId === id.row);
  const col = findNodeById(row, id.col);
  const target = findNodeById(col, id.target);

  useEffect(() => {
    if (target) {
      const {
        style: { backgroundColor, backgroundImage, paddingTop, borderRadius },
      } = target;
      setProperty({
        bgColor: backgroundColor || "#ffffff",
        bgImg: backgroundImage?.match(/url\("([^"]+)"\)/)?.[1] || "",
        padding: parseInt(paddingTop) || "",
        radius: parseInt(borderRadius) || "",
      });
    }
  }, []);

  const handleChange = (property, value) => {
    const newStyle = { ...target.style };
    let newProperty = {};

    switch (property) {
      case "bgColor":
        newStyle.backgroundColor = value;
        newStyle.backgroundImage = "";
        newProperty = { bgImg: "", bgColor: value };
        break;
      case "bgImg":
        newStyle.backgroundColor = "#ffffff";
        newStyle.backgroundImage = `url("${value}")`;
        newStyle.backgroundSize = "cover";
        newStyle.backgroundRepeat = "no-repeat";
        newProperty = { bgColor: "#ffffff", bgImg: value };
        break;
      case "padding":
        newStyle.paddingTop = `${value}px`;
        newStyle.paddingBottom = `${value}px`;
        newProperty = { padding: value };
        break;
      case "radius":
        newStyle.borderRadius = `${value}px`;
        newProperty = { radius: value };
        break;
      default:
        break;
    }

    setProperty((prev) => ({ ...prev, ...newProperty }));
    setProject((prev) =>
      updateProjectComponents(prev, id.target, { style: newStyle })
    );
    debouncedUpdate(updateNode.mutate, { nodeId: id.target, style: newStyle });
  };

  const handleDelete = () => {
    const rowIndex = project.component.findIndex(
      (row) => row.nodeId === id.row
    );

    setProject((prev) => ({
      ...prev,
      component: prev.component.filter((row) => row.nodeId !== id.row),
    }));
    setId(null);

    patchProject.mutate({
      projectId,
      nodeObject: row,
      rowIndex,
      colIndex: null,
      type: PATCH_PROJECT_TYPES.REMOVE_ROW,
    });
  };

  return (
    <Container>
      <div>
        <h5>Frame Property</h5>
        <MdDelete size={25} onClick={handleDelete} />
      </div>
      <InputField
        label="Background color"
        type="color"
        id="background-color"
        value={property.bgColor}
        onChange={(e) => handleChange("bgColor", e.target.value)}
      />
      <InputField
        label="Background image"
        type="text"
        id="background-image"
        value={property.bgImg}
        onChange={(e) => handleChange("bgImg", e.target.value)}
      />
      <InputField
        label="padding"
        type="text"
        id="padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", e.target.value)}
      />
      <InputField
        label="rounding corners"
        type="text"
        id="border-radius"
        value={property.radius}
        onChange={(e) => handleChange("radius", e.target.value)}
      />
    </Container>
  );
};

export default DetailContainer;
