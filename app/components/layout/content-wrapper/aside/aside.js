import React from "react";
import {Link} from "react-router-dom";

import "./aside.scss";

class Aside extends React.Component {
	render() {
		return (
			<div id="aside">

				<div className="row user-panel">
					<div className="col">
						<Link to="/">Login</Link>
					</div>
					<div className="col">
						<Link to="/sign-up">Sign Up</Link>
					</div>
				</div>

				<div className="box d-none d-md-block"></div>
				<div className="box d-none d-md-block"></div>
				<div className="box d-none d-md-block"></div>
				
			</div>
		);
	}
};

export default Aside;