import React from "react";
import {Link} from "react-router-dom";

import FadeIn from "../../../common/animations/fade-in/fade-in";

import "./no-results.scss";

var NoResults = function () {
	return (
		<FadeIn>
			<div className="no-results">
				<div className="title">
					No results were found for this search.
				</div>

				<img src="/img/icons/warning-icon.png"/>

				<div className="home-link">
					Go back to the <Link to="/">home page</Link>
				</div>
			</div>
		</FadeIn>
	);
};

export default NoResults;