import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import "./aside.scss";

import Login from "./login/login";

class Aside extends React.Component {
	
	static propTypes = {
		userSession: PropTypes.object,
		logout: PropTypes.func.isRequired,
		updateSession: PropTypes.func.isRequired
	};
	
	render() {
		
		var loginStatus;
		
		if(this.props.userSession){
			loginStatus = (
				<div>
					{this.props.userSession.username}
					<button className="btn btn-link" onClick={this.props.logout}>Logout</button>
				</div>
			);
		}else{
			loginStatus = <Login updateSession={this.props.updateSession}/>;
		}
		
		return (
			<div id="aside">

				<div className="row user-panel">
					<div className="col">
						{loginStatus}
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