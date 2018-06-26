import React from "react";

import "./header.scss";

import MainMenu from "./main-menu/main-menu";

class Header extends React.Component {
	render() {	
		return (
			<div id="header">
				<MainMenu/>
			</div>
		);
	}
};

export default Header;