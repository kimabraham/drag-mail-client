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
    backgroundColor: "",
    backgroundImage: "",
    padding: "",
    borderRadius: "",
  });

  const row = project.component?.find((row) => row.nodeId === id.row);
  const col = findNodeById(row, id.col);
  const target = findNodeById(col, id.target);

  useEffect(() => {
    if (target) {
      const {
        style: { backgroundColor, backgroundImage, paddingTop, borderRadius },
      } = col;

      const regex = /url\('([^']+)'\)/;
      const matches = backgroundImage?.match(regex);

      setProperty({
        backgroundColor: backgroundColor || "#ffffff",
        backgroundImage: matches?.[1] || "",
        padding: parseInt(paddingTop) || "",
        borderRadius: parseInt(borderRadius) || "",
      });
    }
  }, []);

  const handleChange = (propertyKey, targetId, value) => {
    let inputProps = {};

    switch (propertyKey) {
      case "backgroundColor":
        inputProps = {
          style: {
            ...col.style,
            backgroundColor: value,
            backgroundImage: "",
          },
        };
        break;
      case "backgroundImage":
        inputProps = {
          style: {
            ...col.style,
            backgroundColor: "#ffffff",
            backgroundImage: `url('${value}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          },
        };
        break;
      case "padding":
        inputProps = {
          style: {
            ...col.style,
            paddingTop: `${value}px`,
            paddingBottom: `${value}px`,
          },
        };
        break;
      case "borderRadius":
        inputProps = {
          style: {
            ...col.style,
            borderRadius: `${value}px`,
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
      debouncedUpdate(updateNode.mutate, {
        nodeId: id.col,
        ...inputProps,
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
        value={property.backgroundColor}
        onChange={(e) =>
          handleChange("backgroundColor", id.col, e.target.value)
        }
      />
      <InputField
        label="Background image"
        type="text"
        id="background-image"
        value={property.backgroundImage}
        onChange={(e) =>
          handleChange("backgroundImage", id.col, e.target.value)
        }
      />
      <InputField
        label="Padding"
        type="text"
        id="padding"
        value={property.padding}
        onChange={(e) => handleChange("padding", id.col, e.target.value)}
      />
      <InputField
        label="Rounding corners"
        type="text"
        id="border-radius"
        value={property.borderRadius}
        onChange={(e) => handleChange("borderRadius", id.col, e.target.value)}
      />
    </Container>
  );
};

export default DetailContainer;
