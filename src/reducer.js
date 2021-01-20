export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_IMAGE_REQUEST":
      return {
        ...state,
        loading: true,
        images: null,
        error: null,
      };
    case "FETCH_IMAGE_SUCCESS":
      return {
        ...state,
        images: action.payload.images,
        loading: false,
      };
    case "FETCH_IMAGE_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        images: null,
      };
    case "DOWNLOAD_FILES":
      return {
        ...state,
        loadingDownload: true,
        error: null,
      };
    case "DOWNLOAD_SUCCESS":
      return {
        ...state,
        loadingDownload: false,
        error: null,
      };
    case "DOWNLOAD_FAILED":
      return {
        ...state,
        loadingDownload: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
