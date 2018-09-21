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
			userId: this.props.match.params.id,
			user: null,
			articles: {
				data: [],
				perPage: 6,
				total: 0,
				currentPage: 0,
				totalPages: 0
			}
		};
	}

	componentDidMount() {
		this.getUserData();
	}
		
	/**
	 * Returns the user data (profile, user articles and activity)
	 */
	getUserData() {
		var self = this;
		
		this.setState({loading: true});

		Promise.all([
			UserHttpService.getUserById(this.state.userId),
			this.getArticles(this.state.articles.currentPage)
		]).then(function (responses){
			self.setState({
				loading: false,
				user: responses[0].data
			});
		});
	}
	
	getArticles(page) {
		var self = this;
		
		var offset = page * this.state.articles.perPage;
		
		return ArticleHttpService.getArticlesByAuthor(this.state.userId, this.state.articles.perPage, offset).then(function (response){
			self.setState({
				articles: {
					data: response.data.articles,
					total: response.data.total,
					totalPages: Math.ceil(response.data.total / self.state.articles.perPage)
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
						
						<br/>
						<br/>
						
						<h4>User Activity</h4>

					</React.Fragment>	
				}
			</div>
		);
	}
};

export default Session.withConsumer(UserPage);