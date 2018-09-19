import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./user-menu.scss";

import Session from "../../../../contexts/session";

class UserMenu extends React.Component {
	
	static propTypes = {
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object.isRequired,
			logout: PropTypes.func.isRequired
		})
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
		var clickableArea = $(this.refs.userMenu).find(".toggle-button, .toggle-button *");
				
		if(!$(e.target).is(clickableArea)){
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
		
		var user = this.props.sessionContext.userSession;
		
		return (
			<div className="user-menu" ref="userMenu">
				<div className="dropdown-wrapper">
					<div onClick={this.toggleDropdown} className={classNames("toggle-button", {"opened": this.state.dropdownOpened})}>
						<a href="javascript:void(0)">
							{user.username}
						</a>
						
						<img className="settings-icon" src="/img/icons/settings-icon.png"/>
												
						<div className="dropdown-menu dropdown-menu-right">
							<Link className="dropdown-item" to={"/user/"+user.id}>My Profile</Link>
							{user.type === "admin" && 
								<Link className="dropdown-item" to="/article/new">Add Article</Link>
							}
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" onClick={this.props.sessionContext.logout}>Logout</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Session.withConsumer(UserMenu);