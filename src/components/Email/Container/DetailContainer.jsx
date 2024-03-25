import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDemo, projectInfo, selectRowId } from "../../../utils/atoms";
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
  font-size: 16px;
  & svg {
    color: #3498db;
    cursor: pointer;
    &:hover {
      color: #2980b9;
    }
  }
  & h6 {
    letter-spacing: 1px;
    margin-bottom: 5px;
  }
  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    & label {
      width: 50%;
      letter-spacing: .5px;
      &::after {
        content: " :";
      }
    }
    & input {
      width: 50%;
      padding: 5px 10px;
    }
    & input[type='color'] {
      padding: 0px;
      border: none;
      height: 35px;
    }
  }
`;

const DetailContainer = () => {
  const { id: projectId } = useParams();
  const project = useRecoilValue(projectInfo);
  const setProject = useSetRecoilState(projectInfo);
  const [id, setId] = useRecoilState(selectRowId);
  const demo = useRecoilValue(isDemo);
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
      updateProjectComponents(prev, id.target, { style: newStyle }, demo)
    );
    if (!demo) {
      debouncedUpdate(updateNode.mutate, {
        nodeId: id.target,
        style: newStyle,
      });
    }
  };

  const handleDelete = () => {
    const rowIndex = project.component.findIndex(
      (row) => row.nodeId === id.row
    );

    setProject((prev) => {
      if (demo) {
        localStorage.setItem(
          "project",
          JSON.stringify({
            ...prev,
            component: prev.component.filter((row) => row.nodeId !== id.row),
          })
        );
      }

      return {
        ...prev,
        component: prev.component.filter((row) => row.nodeId !== id.row),
      };
    });

    setId(null);

    if (!demo) {
      patchProject.mutate({
        projectId,
        nodeObject: row,
        rowIndex,
        colIndex: null,
        type: PATCH_PROJECT_TYPES.REMOVE_ROW,
      });
    }
  };

  return (
    <Container>
      <div>
        <h6>Frame Property</h6>
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
        label="Padding"
        type="text"
        id="padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", e.target.value)}
      />
      <InputField
        label="Rounding corners"
        type="text"
        id="border-radius"
        value={property.radius}
        onChange={(e) => handleChange("radius", e.target.value)}
      />
    </Container>
  );
};

export default DetailContainer;
