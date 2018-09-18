import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./user-menu.scss";

class UserMenu extends React.Component {
	
	static propTypes = {
		userSession: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};
	
	constructor(props){
		super(props);
		
		this.state = {
			dropdownOpened: false
		};
		
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.handleWindowClick = this.handleWindowClick.bind(this);
	}
	
	componentDidMount(){
		$(window).click(this.handleWindowClick);
	}
	
	componentWillUnmount(){
		$(window).off("click", this.handleWindowClick);
	}
	
	/**
	 * Closes the dropdown if the user clicks outside of it
	 * @param {Object} e
	 */
	handleWindowClick(e){
		if (!$(e.target).is(".user-menu .toggle-button, .user-menu .toggle-button *")) {
			this.setState({
				dropdownOpened: false
			});
		}
	}
	
	/**
	 * Toggles the dropdown state
	 */
	toggleDropdown(){
		this.setState(function (prevState){
			return {
				dropdownOpened: !prevState.dropdownOpened
			};
		});
	}
		
	render() {
		return (
			<div className="user-menu">
				<div className="dropdown-wrapper">
					<div onClick={this.toggleDropdown} className={classNames("toggle-button", {"opened": this.state.dropdownOpened})}>
						<a href="javascript:void(0)">
							{this.props.userSession.username}
						</a>
						
						<img className="settings-icon" src="/img/icons/settings-icon.png"/>
												
						<div className="dropdown-menu dropdown-menu-right">
							<Link className="dropdown-item" to={"/user/"+this.props.userSession.id}>My Profile</Link>
							{this.props.userSession.type === "admin" && 
								<Link className="dropdown-item" to="/article/new">Add Article</Link>
							}
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" onClick={this.props.logout}>Logout</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default UserMenu;