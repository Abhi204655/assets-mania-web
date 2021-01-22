import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadFile = (fileUrl, dispatch) => {
  dispatch({ type: "DOWNLOAD_FILES" });
  try {
    let fileName = fileUrl.split("/")[fileUrl.split("/").length - 1];
    saveAs(fileUrl, fileName);
    dispatch({ type: "DOWNLOAD_SUCCESS" });
  } catch (e) {
    dispatch({ type: "DOWNLOAD_FAILED", payload: { error: e.message } });
  }
};

export const downloadZip = async (urls, dispatch, weblink) => {
  dispatch({ type: "DOWNLOAD_FILES" });
  try {
    let zip = new JSZip();
    let folder = zip.folder("collection");
    for (let i = 0; i < urls.length; i++) {
      const imageBlob = await fetch(urls[i]).then((response) =>
        response.blob()
      );
      let fileName = urls[i].split("/")[urls[i].split("/").length - 1];
      const imageFile = new File([imageBlob], fileName);
      folder.file(fileName, imageFile);
    }

    let zipName = weblink.split("//")[1].split("/")[0];
    if (/www/.test(zipName)) {
      zipName = zipName.split(".")[1];
    } else {
      zipName = zipName.split(".")[0];
    }
    zipName = zipName.replace(".", "-");

    folder.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, zipName);
    });
    dispatch({ type: "DOWNLOAD_SUCCESS" });
  } catch (e) {
    dispatch({ type: "DOWNLOAD_FAILED", payload: { error: e.message } });
  }
};
