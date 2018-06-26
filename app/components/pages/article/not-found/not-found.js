import React from "react";
import {Link} from "react-router-dom";

import "./not-found.scss";

class NotFound extends React.Component {
	render() {
		return (
			<div className="not-found">
				<div className="title">
					Article not found
				</div>
				<div className="home-link">
					Go back to the <Link to="/">home page</Link>
				</div>
			</div>
		);
	}
};

export default NotFound;