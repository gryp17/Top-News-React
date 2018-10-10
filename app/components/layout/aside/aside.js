import React from "react";
import PropTypes from "prop-types";

import "./aside.scss";

import Login from "./login/login";
import SignUp from "./sign-up/sign-up";
import UserMenu from "./user-menu/user-menu";
import PopularArticlesWidget from "./popular-articles-widget/popular-articles-widget";
import LatestArticlesWidget from "./latest-articles-widget/latest-articles-widget";
import WeatherWidget from "./weather-widget/weather-widget";

import Session from "../../../contexts/session";

class Aside extends React.Component {
	
	static propTypes = {
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object
		})
	};
		
	render() {
		var loading = this.props.sessionContext.loading;
		var isLoggedIn = this.props.sessionContext.userSession !== null;
		
		return (
			<div id="aside">

				<div className="row user-panel">
					{!loading && isLoggedIn &&
						<div className="col">
							<UserMenu/>
						</div>
					}
					
					{!loading && !isLoggedIn && 
						<React.Fragment>
							<div className="col">
								<Login/>
							</div>
							<div className="col">
								<SignUp/>
							</div>
						</React.Fragment>
					}
				</div>

				<div className="box d-none d-md-block">
					<LatestArticlesWidget/>
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

export default Session.withConsumer(Aside);