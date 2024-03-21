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
