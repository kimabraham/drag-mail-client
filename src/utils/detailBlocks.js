import { debounce } from "lodash";
import { updateComponentStyle } from "./nodeUtils";

export const convertYoutubeUrlToThumbnail = (url) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  );
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  } else {
    return null;
  }
};

export const debouncedUpdate = debounce((updateFunction, data) => {
  updateFunction(data);
}, 300);

export const updateProjectComponents = (prev, id, property) => {
  console.log(prev, id, property);
  const updatedComponents = updateComponentStyle(
    prev.component,
    id,
    (comp) => ({
      ...comp,
      ...property,
    })
  );
  return { ...prev, component: updatedComponents };
};
