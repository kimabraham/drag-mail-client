import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { projectInfo, selectRowId } from "../../../utils/atoms";
import { styled } from "styled-components";
import { MdDelete } from "react-icons/md";
import useProject from "../../../hooks/useProject";
import { useParams } from "react-router-dom";
import { PATCH_PROJECT_TYPES } from "../../../constants/constants";
import useNode from "../../../hooks/useNode";
import { findNodeById } from "../../../utils/nodeUtils";

const Container = styled.div`
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
    margin-bottom: 20px;
  }
  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
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
  const { updateNode } = useNode();
  const { id: projectId } = useParams();
  const [project, setProject] = useRecoilState(projectInfo);
  const [id, setId] = useRecoilState(selectRowId);
  const { patchProject } = useProject();

  const [property, setProperty] = useState({
    bgColor: "#ffffff",
    bgImg: "",
    padding: "",
    radius: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const col = findNodeById(row, id.col);
    const target = findNodeById(col, id.target);

    if (row) {
      setProperty({
        bgColor: target.style.backgroundColor || "#ffffff",
        bgImg: target.style.backgroundImage
          ? target.style.backgroundImage.match(/url\("([^"]+)"\)/)[1]
          : "",
        padding: parseInt(target.style.padding) || "",
        radius: parseInt(target.style.borderRadius) || "",
      });
    }
  }, [id, project.component]);

  const updateComponentStyle = (components, nodeId, updateFn) => {
    return components.map((comp) => {
      if (comp.nodeId === nodeId) {
        return updateFn(comp);
      } else if (comp.children) {
        const updatedChildren = updateComponentStyle(
          comp.children,
          nodeId,
          updateFn
        );
        return { ...comp, children: updatedChildren };
      }
      return comp;
    });
  };

  const handleBgColorChange = (e) => {
    let data;
    const newBgColor = e.target.value;
    setProperty({ ...property, bgImg: "", bgColor: newBgColor });
    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id.target,
        (comp) => {
          data = {
            ...comp,
            style: {
              ...comp.style,
              backgroundColor: newBgColor,
              backgroundImage: "",
            },
          };
          return data;
        }
      );

      return { ...prev, component: updatedComponents };
    });
    updateNode.mutate(data);
  };

  const handleBgImgChange = (e) => {
    let data;
    const newBgImg = e.target.value;
    setProperty({ ...property, bgColor: "#ffffff", bgImg: newBgImg });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id.target,
        (comp) => {
          data = {
            ...comp,
            style: {
              ...comp.style,
              backgroundColor: "#ffffff",
              backgroundImage: `url("${newBgImg}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            },
          };
          return data;
        }
      );

      return { ...prev, component: updatedComponents };
    });
    updateNode.mutate(data);
  };

  const handlePaddingChange = (e) => {
    let data;
    const newPadding = e.target.value;
    setProperty({ ...property, padding: newPadding });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id.target,
        (comp) => {
          data = {
            ...comp,
            style: {
              ...comp.style,
              padding: `${newPadding || 0}px`,
            },
          };
          return data;
        }
      );

      return { ...prev, component: updatedComponents };
    });

    updateNode.mutate(data);
  };

  const handleRadiusChange = (e) => {
    let data;
    const newRadius = e.target.value;
    setProperty({ ...property, radius: newRadius });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id.target,
        (comp) => {
          data = {
            ...comp,
            style: {
              ...comp.style,
              borderRadius: `${newRadius || 0}px`,
            },
          };
          return data;
        }
      );

      return { ...prev, component: updatedComponents };
    });

    updateNode.mutate(data);
  };

  const handleDelete = () => {
    const rowIndex = project.component.findIndex(
      (row) => row.nodeId === id.row
    );
    const nodeObject = project.component[rowIndex];

    setProject((prev) => ({
      ...prev,
      component: prev.component.filter((row) => row.nodeId !== id.row),
    }));

    setId(null);

    patchProject.mutate({
      projectId,
      nodeObject,
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
      <div>
        <label htmlFor="background-color">Background color</label>
        <input
          type="color"
          id="background-color"
          value={property.bgColor}
          onChange={handleBgColorChange}
        />
      </div>
      <div>
        <label htmlFor="background-image">Background image</label>
        <input
          type="text"
          id="background-image"
          value={property.bgImg}
          onChange={handleBgImgChange}
        />
      </div>
      <div>
        <label htmlFor="padding">padding</label>
        <input
          type="text"
          id="padding"
          value={property.padding}
          onChange={handlePaddingChange}
        />
      </div>
      <div>
        <label htmlFor="border-radius">rounding corners</label>
        <input
          type="text"
          id="border-radius"
          value={property.radius}
          onChange={handleRadiusChange}
        />
      </div>
    </Container>
  );
};

export default DetailContainer;
