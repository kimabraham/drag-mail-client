import { useCallback, useEffect, useState } from "react";
import { findNodeById, updateComponentStyle } from "../../../utils/nodeUtils";
import useNode from "../../../hooks/useNode";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";

const DetailSpace = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    width: "",
    height: "",
    align: "",
    padding: "",
    border: "",
    borderColor: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const td = findNodeById(row, id.td);
    const target = findNodeById(row, id.target);
    console.log(target.style);
    if (target) {
      setProperty({
        width: parseInt(target.style.width) || "",
        height: parseInt(target.style.borderTopWidth) || "",
        align: target.style.textAlign || "",
        padding: parseInt(td.style.paddingTop) || "",
        border: target.style.borderTopStyle || "",
        borderColor: target.style.borderTopColor || "",
      });
    }
  }, [id, project.component]);

  const handleWidth = useCallback(
    (e) => {
      let data;
      const width = e.target.value || 0;
      setProperty({ ...property, width });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                width: `${width}%`,
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

  const handleHeight = useCallback(
    (e) => {
      let data;
      const height = e.target.value || 0;
      setProperty({ ...property, height });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                borderTopWidth: `${height}px`,
                borderTopStyle: property.border || "solid",
                borderTopColor: property.borderColor,
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
      const align =
        newAlign === "left"
          ? { marginLeft: 0, marginRight: "auto" }
          : newAlign === "center"
          ? { marginLeft: "auto", marginRight: "auto" }
          : { marginLeft: "auto", marginRight: 0 };
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
                ...align,
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
          id.td,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                paddingTop: `${newPadding || 0}px`,
                paddingBottom: `${newPadding || 0}px`,
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

  const handleBorder = useCallback(
    (e) => {
      let data;
      const newBorder = e.target.value;
      setProperty({ ...property, border: newBorder });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                border: 0,
                backgroundColor: "#ffffff",
                borderTop: `${property.height}px ${newBorder} ${property.borderColor}`,
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

  const handleChangeBorderColor = useCallback(
    (e) => {
      let data;
      const newColor = e.target.value;
      setProperty({ ...property, borderColor: newColor });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                borderTopColor: newColor,
                borderTopWidth: `${property.height}px`,
                borderTopStyle: property.border || "solid",
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
      <div>
        <label htmlFor="space-width">width</label>
        <input
          type="text"
          id="space-width"
          value={property.width}
          onChange={handleWidth}
        />
      </div>
      <div>
        <label htmlFor="space-height">height</label>
        <input
          type="text"
          id="space-height"
          value={property.height}
          onChange={handleHeight}
        />
      </div>
      <div>
        <label htmlFor="space-align">align</label>
        <select
          name="space-align"
          id="space-align"
          value={property.align}
          onChange={handleAlign}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label htmlFor="space-padding">padding</label>
        <input
          type="text"
          id="space-padding"
          value={property.padding}
          onChange={handlePadding}
        />
      </div>
      <div>
        <label htmlFor="space-border">border</label>
        <select
          name="space-border"
          id="space-border"
          value={property.border}
          onChange={handleBorder}
        >
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
      <div>
        <label htmlFor="space-borderColor">border color</label>
        <input
          type="color"
          id="space-borderColor"
          value={property.borderColor}
          onChange={handleChangeBorderColor}
        />
      </div>
    </>
  );
};

export default DetailSpace;
