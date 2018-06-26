import React from "react";
import {NavLink} from "react-router-dom";

import classnames from "classnames";

import "./main-menu.scss";

class MainMenu extends React.Component {
	
	constructor(props){
		super(props);
		
		this.slideDuration = 300;
				
		this.toggleMenu = this.toggleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}
	
	/**
	 * Toggles the main menu
	 */
	toggleMenu(){
		$(this.refs.sections).slideToggle(this.slideDuration);
	}
	
	/**
	 * Hides the main menu when any of the menu options is clicked (only if the hamburger button is visible/on lower resolutions)
	 */
	hideMenu(){
		if($(this.refs.hamburger).is(":visible")){
			$(this.refs.sections).slideUp(this.slideDuration);
		}
	}
	
	/**
	 * Renders the component
	 * @returns {String}
	 */
	render() {
		var self = this;
		
		var sections = [
			"politics",
			"economy",
			"world",
			"technology",
			"sports"
		];
		
		//generate the section options
		var sectionOptions = sections.map(function (section){
			return (
				<NavLink exact to={"/search/"+section} className={classnames("option", section)} key={section} onClick={self.hideMenu} activeClassName="active">
					<img src={"/img/sections/"+section+".png"} alt={section}/>
					{section}
				</NavLink>
			);
		});
		
		return (
			<div id="main-menu">
				<NavLink exact to="/" className="home-link" activeClassName="active">
					<img src="/img/logo.png" alt="Top-News"/>
				</NavLink>
				
				<button className="btn btn-light btn-hamburger" ref="hamburger" onClick={this.toggleMenu}>
					<img src="/img/hamburger-icon.png"/>
				</button>
				
				<div className="sections" ref="sections">
					{sectionOptions}
				</div>
				
			</div>
		);
	}
};

export default MainMenu;