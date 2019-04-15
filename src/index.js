import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Components/Router";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Router />, document.querySelector("#root"));
serviceWorker.register();
