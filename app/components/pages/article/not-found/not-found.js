import React from "react";
import {Link} from "react-router-dom";

import FadeIn from "../../../common/animations/fade-in/fade-in";

import "./not-found.scss";

class NotFound extends React.Component {
	render() {
		return (
			<FadeIn>
				<div className="not-found">
					<div className="title">
						Article not found
					</div>
					
					<img src="/img/icons/warning-icon.png"/>
					
					<div className="home-link">
						Go back to the <Link to="/">home page</Link>
					</div>
				</div>
			</FadeIn>
		);
	}
};

export default NotFound;