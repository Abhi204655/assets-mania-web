import { useState } from "react";
import "./App.css";
import * as _api from "./api";
import { saveAs } from "file-saver";
import JSZip from "jszip";

function App() {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState(null);

  const getImages = async () => {
    console.log("entered");
    let res = await _api.getImageSrc({ url });
    setImages(res.data);
  };

  const saveFile = (fileUrl) => {
    let fileName = fileUrl.split("/")[fileUrl.split("/").length - 1];
    saveAs(fileUrl, fileName);
  };

  const saveAllFiles = async (urls) => {
    let zip = new JSZip();
    let folder = zip.folder("collection");

    for (let i = 0; i < urls.length; i++) {
      console.log(urls[i]);
      const imageBlob = await fetch(urls[i]).then((response) =>
        response.blob()
      );
      console.log(imageBlob);
      let fileName = urls[i].split("/")[urls[i].split("/").length - 1];
      const imageFile = new File([imageBlob], fileName);
      folder.file(fileName, imageFile);
    }

    folder.generateAsync({ type: "blob" }).then((content) => {
      console.log(content);
      saveAs(content, "images");
    });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="enter url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="button" onClick={getImages}>
        Get images
      </button>
      {images && (
        <>
          <button onClick={() => saveAllFiles(images)}>Download</button>
          {images.map((i) => (
            <div>
              <img src={i} alt="downloadble" style={{ width: "50px" }} />
              <button onClick={() => saveFile(i)}>Download</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
