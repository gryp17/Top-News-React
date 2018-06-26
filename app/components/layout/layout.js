import React from "react";
import {Switch, Route, NavLink} from "react-router-dom";

import "./layout.scss";

import Header from "./header/header";
import Footer from "./footer/footer";
import ContentWrapper from "./content-wrapper/content-wrapper";

class Layout extends React.Component {
	render() {
				
		return (
			<div id="top-news">
				<Header/>
				<ContentWrapper/>
				<Footer/>
			</div>
		);
	}
};

export default Layout;