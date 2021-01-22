import { useReducer, useEffect } from "react";
import "./App.css";
import AssetBox from "./components/AssetBox";
import SearchBox from "./components/SearchBox";
import { reducer } from "./reducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialState = {
  loading: false,
  loadingDownload: false,
  images: null,
  error: null,
  url: null,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: state.error,
      });
    }
  }, [state.error]);
  return (
    <div className="main">
      <h2 className="title">ASSETS MANIA</h2>
      <SearchBox dispatch={dispatch} state={state} />
      {state.images && <AssetBox state={state} dispatch={dispatch} />}
    </div>
  );
};

export default App;
