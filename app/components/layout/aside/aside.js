import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import "./aside.scss";

import Login from "./login/login";
import SignUp from "./sign-up/sign-up";
import PopularArticlesWidget from "./popular-articles-widget/popular-articles-widget";
import WeatherWidget from "./weather-widget/weather-widget";

class Aside extends React.Component {
	
	static propTypes = {
		userSession: PropTypes.object,
		logout: PropTypes.func.isRequired,
		updateSession: PropTypes.func.isRequired
	};
		
	render() {
		return (
			<div id="aside">

				<div className="row user-panel">
					{this.props.userSession &&
						<div className="col">
							{this.props.userSession.username}
							<button className="btn btn-link" onClick={this.props.logout}>Logout</button>
						</div>
					}
					
					{!this.props.userSession && 
						<div className="col">
							<Login updateSession={this.props.updateSession}/>
						</div>
					}
							
					{!this.props.userSession &&
						<div className="col">
							<SignUp updateSession={this.props.updateSession}/>
						</div>
					}
				</div>

				<div className="box d-none d-md-block">
					<PopularArticlesWidget/>
				</div>

				<div className="box d-none d-md-block">
					<WeatherWidget/>
				</div>
				
			</div>
		);
	}
};

export default Aside;