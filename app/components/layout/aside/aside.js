import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import "./aside.scss";

class Aside extends React.Component {
	
	static propTypes = {
		userSession: PropTypes.object
	};
	
	render() {
		return (
			<div id="aside">

				<div className="row user-panel">
					<div className="col">
						{!this.props.userSession && <Link to="/">Login</Link>}
						{this.props.userSession && this.props.userSession.username}
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