import React from "react";
import PropTypes from "prop-types";

import "./user-page.scss";

import UserHttpService from "../../../services/api/user";
import ArticleHttpService from "../../../services/api/article";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import NotFound from "../../common/not-found/not-found";
import UserDetails from "./user-details/user-details";
import UserArticles from "./user-articles/user-articles";

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
			user: null,
			articles: {
				limit: 6,
				offset: 0,
				data: []
			}
		};
	}

	componentDidMount() {
		this.getUserData(this.props.match.params.id);
	}
		
	/**
	 * Returns the user data (profile, user articles and activity)
	 * @param {Number} id
	 */
	getUserData(id) {
		var self = this;
		
		this.setState({loading: true});

		Promise.all([
			UserHttpService.getUserById(id),
			ArticleHttpService.getArticlesByAuthor(id, this.state.articles.limit, this.state.articles.offset)
		]).then(function (responses){
			self.setState({
				loading: false,
				user: responses[0].data,
				articles: {
					data: responses[1].data
				}
			});
		});
	}
	
	render() {
		return (
			<div id="user-page">
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && !this.state.user && <NotFound/>}
				
				{this.state.user && 
					<React.Fragment>
						<UserDetails user={this.state.user} currentUser={this.props.sessionContext.userSession}/>
						<UserArticles articles={this.state.articles.data}/>
						
						<h4>User Activity</h4>

					</React.Fragment>	
				}
			</div>
		);
	}
};

export default Session.withConsumer(UserPage);