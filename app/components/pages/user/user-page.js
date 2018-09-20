import React from "react";
import PropTypes from "prop-types";

import "./user-page.scss";

import UserHttpService from "../../../services/api/user";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import NotFound from "../../common/not-found/not-found";
import UserDetails from "./user-details/user-details";

import Session from "../../../contexts/session";

class UserPage extends React.Component {

	static propTypes = {
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object
		})
	};

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			user: null
		};
	}

	componentDidMount() {
		this.getUser(this.props.match.params.id);
	}
		
	/**
	 * Get the user that matches the specified id
	 * @param {Number} id
	 */
	getUser(id) {
		var self = this;
		
		this.setState({loading: true});

		UserHttpService.getUserById(id).then(function (response) {
			self.setState({
				loading: false,
				user: response.data
			});
		});
	}
	
	render() {
		return (
			<div id="user-page">
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && !this.state.user && <NotFound/>}
				
				{this.state.user && <UserDetails user={this.state.user} currentUser={this.props.sessionContext.userSession}/>}
			</div>
		);
	}
};

export default Session.withConsumer(UserPage);