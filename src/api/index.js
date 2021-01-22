import axios from "axios";

export const getImageSrc = async ({ url, dispatch }) => {
  dispatch({ type: "FETCH_IMAGE_REQUEST", payload: { url } });
  try {
    let res = await axios.post(
      "https://assetsmania.herokuapp.com/api/get_images",
      { url }
    );
    dispatch({
      type: "FETCH_IMAGE_SUCCESS",
      payload: { images: res.data.data },
    });
  } catch (e) {
    dispatch({ type: "FETCH_IMAGE_FAILURE", payload: { error: e.message } });
  }
};
