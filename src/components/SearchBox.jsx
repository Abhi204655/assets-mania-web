import React, { useState } from "react";
import * as _api from "../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );
  return res !== null;
};

const SearchBox = ({ state, dispatch }) => {
  const [url, setUrl] = useState("");

  const getImages = async () => {
    if (url !== "" && isValidURL(url)) {
      await _api.getImageSrc({ url, dispatch });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Please enter a valid URL",
        text: state.error,
      });
    }
  };
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Enter the URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={getImages}>
        {state.loading ? "Loading..." : "GET IMAGES"}
      </button>
    </div>
  );
};

export default SearchBox;
