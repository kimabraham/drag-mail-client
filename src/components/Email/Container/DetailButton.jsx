import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import useNode from "../../../hooks/useNode";
import { findNodeById, updateComponentStyle } from "../../../utils/nodeUtils";

const DetailButton = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    content: "",
    bgColor: "",
    fontColor: "",
    link: "",
    width: "",
    align: "",
    padding: "",
    border: "",
  });
  console.log(property);
  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const td = findNodeById(row, id.td);
    const target = findNodeById(row, id.target);
    console.log(target);
    if (target) {
      setProperty({
        content: target.inner || "Button",
        bgColor: target.style.backgroundColor || "#1D90FF",
        fontColor: target.style.color || "#ffffff",
        link: target.props.href?.replace("http://", "") || "",
        width: parseInt(target.style.width) || "",
        align: td.style.textAlign || "",
        padding: parseInt(target.style.padding) || "",
        border: parseInt(target.style.borderRadius) || "",
      });
    }
  }, [id, project.component]);

  const handleChangeLink = useCallback(
    (e) => {
      let data;
      const newImgUrl = e.target.value;
      setProperty({ ...property, imgUrl: newImgUrl });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              props: {
                ...comp.props,
                href: `http://${newImgUrl}`,
                target: "_blank",
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

  const handleChangeBgColor = useCallback(
    (e) => {
      let data;
      const newColor = e.target.value;
      setProperty({ ...property, bgColor: newColor });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                backgroundColor: newColor,
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
      setProperty({ ...property, fontColor: newColor });

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
                width: `${width || "100"}%`,
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
      const align = e.target.value;
      setProperty({ ...property, align });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.td,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                textAlign: align,
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
      const padding = e.target.value;
      setProperty({ ...property, padding });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                padding: `${padding || 0}px`,
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
      const border = e.target.value;
      setProperty({ ...property, border });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                borderRadius: `${border || 0}px`,
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
        <label htmlFor="button-content">content</label>
        <input
          type="button"
          id="button-content"
          value={property.content}
          onChange={handleChangeContent}
        />
      </div>
      <div>
        <label htmlFor="button-bgColor">background color</label>
        <input
          type="color"
          id="button-bgColor"
          value={property.bgColor}
          onChange={handleChangeBgColor}
        />
      </div>
      <div>
        <label htmlFor="button-color">font color</label>
        <input
          type="color"
          id="button-color"
          value={property.fontColor}
          onChange={handleChangeColor}
        />
      </div>
      <div>
        <label htmlFor="button-url">link</label>
        <input
          type="text"
          id="button-url"
          value={property.link}
          onChange={handleChangeLink}
        />
      </div>
      <div>
        <label htmlFor="button-width">width</label>
        <input
          type="text"
          id="button-width"
          value={property.width}
          onChange={handleWidth}
        />
      </div>
      <div>
        <label htmlFor="button-align">align</label>
        <select
          name="button-align"
          id="button-align"
          defaultValue={property.align}
          value={property.align}
          onChange={handleAlign}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label htmlFor="button-padding">padding</label>
        <input
          type="text"
          id="button-padding"
          value={property.padding}
          onChange={handlePadding}
        />
      </div>
      <div>
        <label htmlFor="button-borderR">border radius</label>
        <input
          type="text"
          id="button-borderR"
          value={property.border}
          onChange={handleBorder}
        />
      </div>
    </>
  );
};

export default DetailButton;
