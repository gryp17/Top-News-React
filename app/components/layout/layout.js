import React from "react";
import {Switch, Route, NavLink} from "react-router-dom";

import "./layout.scss";

import MainMenu from "./main-menu/main-menu";
import Footer from "./footer/footer";
import Content from "./content/content";
import Aside from "./aside/aside";

class Layout extends React.Component {
	render() {
				
		return (
			<div id="top-news">
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
			</div>
		);
	}
};

export default Layout;