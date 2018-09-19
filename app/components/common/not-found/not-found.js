import React from "react";
import {Link} from "react-router-dom";

import FadeIn from "../animations/fade-in/fade-in";

import "./not-found.scss";

var NotFound = function () {
	return (
		<FadeIn>
			<div className="not-found">
				<div className="title">
					Resource not found
				</div>

				<img src="/img/icons/warning-icon.png"/>

				<div className="home-link">
					Go back to the <Link to="/">home page</Link>
				</div>
			</div>
		</FadeIn>
	);
};

export default NotFound;