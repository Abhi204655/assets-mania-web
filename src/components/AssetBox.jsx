import React from "react";
import ImageBox from "./ImageBox";
import { downloadZip } from "../utils";

const AssetBox = ({ state, dispatch }) => {
  return (
    <div className="assetBox">
      <div className="assetNav">
        <h2>Images:</h2>
        <button
          className="btn"
          onClick={() => downloadZip(state.images, dispatch)}
        >
          {state.loadingDownload ? "Downloading.." : "Download All"}
        </button>
      </div>
      {state.images.map((url, index) => (
        <>
          <ImageBox url={url} dispatch={dispatch} />
          <div className="saperator"></div>
        </>
      ))}
    </div>
  );
};

export default AssetBox;
