import axios from "axios";

export const getImageSrc = async ({ url }) => {
  try {
    let res = await axios.post(
      "https://assetsmania.herokuapp.com/api/get_images",
      { url }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
