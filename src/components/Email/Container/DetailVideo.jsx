import { useCallback, useEffect, useState } from "react";
import useNode from "../../../hooks/useNode";
import { findNodeById, updateComponentStyle } from "../../../utils/nodeUtils";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectInfo, selectBlockId } from "../../../utils/atoms";
import { convertYoutubeUrlToThumbnail } from "../../../utils/detailBlocks";

const DetailVideo = () => {
  const { updateNode } = useNode();
  const [project, setProject] = useRecoilState(projectInfo);
  const id = useRecoilValue(selectBlockId);
  const [property, setProperty] = useState({
    videoUrl: "",
    width: "",
    height: "",
    align: "",
    padding: "",
  });

  useEffect(() => {
    const row = project.component.find((row) => row.nodeId === id.row);
    const col = findNodeById(row, id.col);
    const td = findNodeById(col, id.td);
    const target = findNodeById(td, id.target);

    if (target) {
      setProperty({
        videoUrl: td.children[0].props.href || "",
        width: parseInt(td.children[0].style.width) || "",
        height: parseInt(td.children[0].style.height) || "",
        align: td.children[0].style.textAlign || "",
        padding: parseInt(td.style.padding) || "",
      });
    }
  }, [id, project.component]);

  const handleChangeVideo = useCallback(
    (e) => {
      let data, data2;

      const newVideoUrl = e.target.value;
      const row = project.component.find((row) => row.nodeId === id.row);
      const td = findNodeById(row, id.td);
      const link = td.children[0].nodeId;
      setProperty({ ...property, imgUrl: newVideoUrl });

      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          link,
          (comp) => {
            data = {
              ...comp,
              props: {
                ...comp.props,
                href: newVideoUrl,
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          id.target,
          (comp) => {
            data2 = {
              ...comp,
              props: {
                ...comp.props,
                src: convertYoutubeUrlToThumbnail(newVideoUrl),
              },
            };
            return data2;
          }
        );
        return { ...prev, component: updatedComponents };
      });
      updateNode.mutate(data);

      updateNode.mutate(data2);
    },
    [id, project.component, property, setProject, updateNode]
  );

  const handleWidth = useCallback(
    (e) => {
      let data;
      const width = e.target.value || 0;
      const row = project.component.find((row) => row.nodeId === id.row);
      const td = findNodeById(row, id.td);
      const link = td.children[0].nodeId;
      setProperty({ ...property, width });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          link,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                width: `${width}%`,
                height: "auto",
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });
      updateNode.mutate(data);
    },
    [id, project.component, property, setProject, updateNode]
  );

  const handleHeight = useCallback(
    (e) => {
      let data;
      const height = e.target.value;
      const row = project.component.find((row) => row.nodeId === id.row);
      const td = findNodeById(row, id.td);
      const link = td.children[0].nodeId;
      setProperty({ ...property, height });
      setProject((prev) => {
        const updatedComponents = updateComponentStyle(
          prev.component,
          link,
          (comp) => {
            data = {
              ...comp,
              style: {
                ...comp.style,
                height: height ? `${height}%` : "auto",
              },
            };
            return data;
          }
        );
        return { ...prev, component: updatedComponents };
      });
      updateNode.mutate(data);
    },
    [id, project.component, property, setProject, updateNode]
  );

  const handleAlign = useCallback(
    (e) => {
      let data;
      const newAlign = e.target.value;
      const row = project.component.find((row) => row.nodeId === id.row);
      const td = findNodeById(row, id.td);
      const link = td.children[0].nodeId;
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
          link,
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
    [id, project.component, property, setProject, updateNode]
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
                padding: `${padding}px`,
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
        <label htmlFor="video-url">youtube url</label>
        <input
          type="text"
          id="video-url"
          value={property.videoUrl}
          onChange={handleChangeVideo}
        />
      </div>
      <div>
        <label htmlFor="video-width">width</label>
        <input
          type="text"
          id="video-width"
          value={property.width}
          onChange={handleWidth}
        />
      </div>
      <div>
        <label htmlFor="video-height">height</label>
        <input
          type="text"
          id="video-height"
          value={property.height}
          onChange={handleHeight}
        />
      </div>
      <div>
        <label htmlFor="video-align">align</label>
        <select
          name="video-align"
          id="video-align"
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
        <label htmlFor="video-padding">padding y</label>
        <input
          type="text"
          id="video-padding"
          value={property.padding}
          onChange={handlePadding}
        />
      </div>
    </>
  );
};

export default DetailVideo;
