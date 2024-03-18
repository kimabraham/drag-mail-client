import PropTypes from "prop-types";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectInfo } from "../../../utils/atoms";
import { styled } from "styled-components";
import { MdDelete } from "react-icons/md";
import useProject from "../../../hooks/useProject";
import { useParams } from "react-router-dom";
import { PATCH_PROJECT_TYPES } from "../../../constants/constants";

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

const DetailContainer = ({ id, setId }) => {
  const project = useRecoilValue(projectInfo);
  const { id: projectId } = useParams();
  const setProject = useSetRecoilState(projectInfo);
  const { patchProject } = useProject();

  const [property, setProperty] = useState({
    bgColor: "",
    bgImg: "",
    padding: "",
    radius: "",
  });

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
    const newBgColor = e.target.value;
    setProperty({ ...property, bgColor: newBgColor });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id,
        (comp) => ({
          ...comp,
          style: {
            ...comp.style,
            background: newBgColor,
          },
        })
      );

      return { ...prev, component: updatedComponents };
    });
  };

  const handleBgImgChange = (e) => {
    const newBgImg = e.target.value;
    setProperty({ ...property, bgImg: newBgImg });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id,
        (comp) => ({
          ...comp,
          style: {
            ...comp.style,
            background: `url("${newBgImg}")`,
          },
        })
      );

      return { ...prev, component: updatedComponents };
    });
  };

  const handlePaddingChange = (e) => {
    const newPadding = e.target.value;
    console.log(newPadding);
    setProperty({ ...property, padding: newPadding });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id,
        (comp) => ({
          ...comp,
          style: {
            ...comp.style,
            padding: `${newPadding}px`,
          },
        })
      );

      return { ...prev, component: updatedComponents };
    });
  };

  const handleRadiusChange = (e) => {
    const newRadius = e.target.value;
    setProperty({ ...property, radius: newRadius });

    setProject((prev) => {
      const updatedComponents = updateComponentStyle(
        prev.component,
        id,
        (comp) => ({
          ...comp,
          style: {
            ...comp.style,
            borderRadius: `${newRadius}px`,
          },
        })
      );

      return { ...prev, component: updatedComponents };
    });
  };

  const handleDelete = () => {
    const rowIndex = project.component.findIndex(
      (row) => row.children[0].children[0].nodeId === id
    );
    const nodeObject = project.component[rowIndex];

    setProject((prev) => ({
      ...prev,
      component: prev.component.filter(
        (row) => row.children[0].children[0].nodeId !== id
      ),
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

DetailContainer.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
};

export default DetailContainer;
