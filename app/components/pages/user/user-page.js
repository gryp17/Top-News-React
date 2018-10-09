import React from "react";
import PropTypes from "prop-types";

import "./user-page.scss";

import UserHttpService from "../../../services/api/user";
import ArticleHttpService from "../../../services/api/article";
import ArticleCommentsHttpService from "../../../services/api/article-comment";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import NotFound from "../../common/not-found/not-found";
import UserDetails from "./user-details/user-details";
import UserArticles from "./user-articles/user-articles";
import UserActivity from "./user-activity/user-activity";

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
				perPage: 12,
				total: 0,
				currentPage: 0,
				totalPages: 0
			},
			comments: {
				data: [],
				perPage: 8,
				total: 0,
				currentPage: 0,
				totalPages: 0
			}
		};

		this.goToArticlesPage = this.goToArticlesPage.bind(this);
		this.goToCommentsPage = this.goToCommentsPage.bind(this);
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
			this.getArticles(this.state.articles.currentPage),
			this.getComments(this.state.comments.currentPage)
		]).then(function (responses){
			self.setState({
				loading: false,
				user: responses[0].data
			});
		});
	}
	
	/**
	 * Gets the user articles
	 * @param {Number} page
	 * @returns {Promise}
	 */
	getArticles(page) {
		var self = this;
		
		var offset = page * this.state.articles.perPage;
		
		return ArticleHttpService.getArticlesByAuthor(this.state.userId, this.state.articles.perPage, offset).then(function (response){
			//spread the articles object in order to update the nested attributes correctly
			self.setState({
				articles: {
					...self.state.articles,
					data: response.data.articles,
					total: response.data.total,
					totalPages: Math.ceil(response.data.total / self.state.articles.perPage)
				}
			});
		});
	}

	/**
	 * Gets the user comments
	 * @param {Number} page 
	 * @returns {Promise}
	 */
	getComments(page) {
		var self = this;
		
		var offset = page * this.state.comments.perPage;
		
		return ArticleCommentsHttpService.getCommentsByAuthor(this.state.userId, this.state.comments.perPage, offset).then(function (response){
			//spread the comments object in order to update the nested attributes correctly
			self.setState({
				comments: {
					...self.state.comments,
					data: response.data.comments,
					total: response.data.total,
					totalPages: Math.ceil(response.data.total / self.state.comments.perPage)
				}
			});
		});
	}

	/**
	 * Sets the current page and loads the corresponding articles
	 * @param {Number} page
	 */
	goToArticlesPage(page){
		this.setState({
			articles: {
				...this.state.articles,
				currentPage: page
			}
		}, function () {
			this.getArticles(this.state.articles.currentPage);
		});
	}

	/**
	 * Sets the current page and loads the corresponding comments
	 * @param {Number} page
	 */
	goToCommentsPage(page){
		this.setState({
			comments: {
				...this.state.comments,
				currentPage: page
			}
		}, function () {
			this.getComments(this.state.comments.currentPage);
		});
	}
	
	render() {
		return (
			<div id="user-page">
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && !this.state.user && <NotFound/>}
				
				{this.state.user && 
					<React.Fragment>

						<ul className="nav nav-tabs" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">
									User Details
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="articles-tab" data-toggle="tab" href="#articles" role="tab" aria-controls="articles" aria-selected="false">
									User Articles
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">
									User Activity
								</a>
							</li>
						</ul>

						<div className="tab-content">
							<div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
								<UserDetails user={this.state.user} currentUser={this.props.sessionContext.userSession}/>
							</div>
							<div className="tab-pane fade" id="articles" role="tabpanel" aria-labelledby="articles-tab">
								<UserArticles {...this.state.articles} goToPage={this.goToArticlesPage}/>
							</div>
							<div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
								<UserActivity {...this.state.comments} goToPage={this.goToCommentsPage}/>
							</div>
						</div>

					</React.Fragment>	
				}
			</div>
		);
	}
};

export default Session.withConsumer(UserPage);