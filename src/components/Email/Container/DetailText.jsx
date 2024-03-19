import { useCallback, useEffect, useState } from "react";
import { findNodeById, updateComponentStyle } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import useNode from "../../../hooks/useNode";

const DetailText = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    content: "",
    size: "",
    color: "",
    textAlign: "",
    padding: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const target = findNodeById(row, id.target);

    if (target) {
      setProperty({
        content: target.inner || "",
        size: parseInt(target.style.fontSize) || "",
        color: target.style.color || "#000000",
        textAlign: target.style.textAlign || "",
        padding: parseInt(target.style.padding) || "",
      });
    }
  }, [id, project.component]);

  const handleChangeContent = useCallback(
    (e) => {
      let data;
      const newContent = e.target.value;
      setProperty({ ...property, content: newContent });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              inner: newContent,
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });

      updateNode.mutate(data);
    },
    [id, property, setProject, updateNode]
  );

  const handleChangeSize = useCallback(
    (e) => {
      let data;
      const newSize = e.target.value;
      setProperty({ ...property, size: newSize });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                fontSize: `${newSize || 0}px`,
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });

      updateNode.mutate(data);
    },
    [id, property, setProject, updateNode]
  );

  const handleChangeColor = useCallback(
    (e) => {
      let data;
      const newColor = e.target.value;
      setProperty({ ...property, color: newColor });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                color: newColor,
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });

      updateNode.mutate(data);
    },
    [id, property, setProject, updateNode]
  );

  const handleAlign = useCallback(
    (e) => {
      let data;
      const newAlign = e.target.value;
      setProperty({ ...property, textAlign: newAlign });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                textAlign: newAlign,
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });
      updateNode.mutate(data);
    },
    [id, property, setProject, updateNode]
  );

  const handlePadding = useCallback(
    (e) => {
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
    },
    [id, property, setProject, updateNode]
  );

  return (
    <>
      <>
        <div>
          <label htmlFor="text-content">content</label>
          <input
            type="text"
            id="text-content"
            value={property.content}
            onChange={handleChangeContent}
          />
        </div>
        <div>
          <label htmlFor="text-size">font size</label>
          <input
            type="text"
            id="text-size"
            value={property.size}
            onChange={handleChangeSize}
          />
        </div>
        <div>
          <label htmlFor="text-color">font color</label>
          <input
            type="color"
            id="text-color"
            value={property.color}
            onChange={handleChangeColor}
          />
        </div>
        <div>
          <label htmlFor="text-align">align</label>
          <select
            name="text-align"
            id="text-align"
            defaultValue={property.textAlign}
            value={property.textAlign}
            onChange={handleAlign}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label htmlFor="text-padding">padding</label>
          <input
            type="text"
            id="text-padding"
            value={property.padding}
            onChange={handlePadding}
          />
        </div>
      </>
    </>
  );
};

export default DetailText;
