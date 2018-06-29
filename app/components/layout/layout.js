import React from "react";
import {Switch, Route, NavLink} from "react-router-dom";

import "./layout.scss";

import MainMenu from "./main-menu/main-menu";
import Footer from "./footer/footer";
import Content from "./content/content";
import Aside from "./aside/aside";

import UserHttpService from "../../services/api/user";

class Layout extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			userSession: null
		};
	}
	
	componentDidMount(){
		var self = this;;

		UserHttpService.getSession().then(function (response) {
			if (response.data.user) {
				self.setState({userSession: response.data.user});
			}
		});		
	}
	
	render() {
				
		return (
			<div id="top-news">
				<MainMenu/>
				
				<div id="content-wrapper">
					<div className="row no-gutters">
						<div className="col-md-4 order-md-8 col-sm-push-8">
							<Aside userSession={this.state.userSession}/>
						</div>
						<div className="col-md-8 order-md-4 col-sm-pull-4">
							<Content userSession={this.state.userSession}/>
						</div>
					</div>
				</div>

				<Footer/>
			</div>
		);
	}
};

export default Layout;