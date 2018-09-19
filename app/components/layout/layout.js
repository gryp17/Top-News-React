import React from "react";
import {Switch, Route, NavLink} from "react-router-dom";

import "./layout.scss";

import MainMenu from "./main-menu/main-menu";
import Footer from "./footer/footer";
import Content from "./content/content";
import Aside from "./aside/aside";

import UserHttpService from "../../services/api/user";

import Session from "../../contexts/session";

class Layout extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			userSession: null
		};
		
		this.updateSession = this.updateSession.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	componentDidMount(){
		this.getSession();	
	}
	
	/**
	 * Retrieves the current session status
	 */
	getSession(){
		var self = this;

		UserHttpService.getSession().then(function (response) {
			if (response.data.user) {
				self.setState({userSession: response.data.user});
			}
		});	
	}
	
	/**
	 * Callback function that is called when the user logs in (the login process is handled in another component)
	 * @param {Object} userSession
	 */
	updateSession(userSession){
		this.setState({userSession: userSession});
	}
	
	/**
	 * Callback function that is called when the logout button is pressed
	 */
	logout(){
		var self = this;
		
		UserHttpService.logout().then(function () {
			self.setState({userSession: null});
		});	
	}
	
	render() {
		
		//data that is acessible by all components that use the session context HOC
		var sessionData = {
			userSession: this.state.userSession,
			updateSession: this.updateSession,
			logout: this.logout
		};
		
		return (
			<div id="top-news">
				<Session.Context.Provider value={sessionData}>
					<MainMenu/>

					<div id="content-wrapper">
						<div className="row no-gutters">
							<div className="col-md-4 order-md-8 col-sm-push-8">
								<Aside/>
							</div>
							<div className="col-md-8 order-md-4 col-sm-pull-4">
								<Content/>
							</div>
						</div>
					</div>

					<Footer/>
				</Session.Context.Provider>
			</div>
		);
	}
};

export default Layout;