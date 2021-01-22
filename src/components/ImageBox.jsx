import React from "react";
import { downloadFile } from "../utils";

const ImageBox = ({ url, dispatch }) => {
  let ImageName = url.split("/")[url.split("/").length - 1];
  return (
    <div className="imageBox">
      <div className="imageData">
        <div className="image">
          <img src={url} alt="downloadable" />
        </div>
        <p className="imageName">{ImageName}</p>
      </div>
      <button className="btn" onClick={() => downloadFile(url, dispatch)}>
        Download
      </button>
    </div>
  );
};

export default ImageBox;
