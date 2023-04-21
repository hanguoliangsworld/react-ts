import React from "react";

const WebpImage = (props) => {
  const { src } = props;

  const webpSrc = React.useMemo(() => {
    const nameChunks = src.split(".");
    nameChunks.pop();
    nameChunks.push("webp");
    return nameChunks.join(".");
  }, [src]);

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img {...props} />
    </picture>
  );
};
export default WebpImage;
