import { useCallback, useEffect, useState } from "react";
import useNode from "../../../hooks/useNode";
import { findNodeById, updateComponentStyle } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";

const DetailImg = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    imgUrl: "",
    width: "",
    align: "",
    padding: "",
    border: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const td = findNodeById(row, id.td);
    const target = findNodeById(row, id.target);
    if (target) {
      setProperty({
        imgUrl: target.props.src || "",
        width: parseInt(target.style.width) || "",
        align: td.style.textAlign || "",
        padding: parseInt(td.style.padding) || "",
        border: parseInt(target.style.borderRadius) || "",
      });
    }
  }, [id, project.component]);

  const handleChangeImg = useCallback(
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
                src: newImgUrl,
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
          id.td,
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
        <label htmlFor="image-url">img url</label>
        <input
          type="text"
          id="image-url"
          value={property.imgUrl}
          onChange={handleChangeImg}
        />
      </div>
      <div>
        <label htmlFor="image-width">width</label>
        <input
          type="text"
          id="image-width"
          value={property.width}
          onChange={handleWidth}
        />
      </div>
      <div>
        <label htmlFor="image-align">align</label>
        <select
          name="image-align"
          id="image-align"
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
        <label htmlFor="image-padding">padding</label>
        <input
          type="text"
          id="image-padding"
          value={property.padding}
          onChange={handlePadding}
        />
      </div>
      <div>
        <label htmlFor="image-borderR">border radius</label>
        <input
          type="text"
          id="image-borderR"
          value={property.border}
          onChange={handleBorder}
        />
      </div>
    </>
  );
};

export default DetailImg;
