import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import Layout from "./components/layout/layout";

//import bootstrap
import "bootstrap";

//import the global CSS rules
import "./index.scss";

ReactDOM.render(
(
	<BrowserRouter>
		<Layout/>
	</BrowserRouter>
), document.getElementById("root"));