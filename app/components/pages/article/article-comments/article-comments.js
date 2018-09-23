import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import "./article-comments.scss";

import Config from "../../../../config/config";
import ArticleCommentHttpService from "../../../../services/api/article-comment";
import Pagination from "../../../common/pagination/pagination";

import Session from "../../../../contexts/session";

class ArticleComments extends React.Component {
	
	static propTypes = {
		articleId: PropTypes.number.isRequired,
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object
		})
	};

	constructor(props) {
		super(props);
		
		this.state = {
			comments: [],
			perPage: 6,
			total: 0,
			currentPage: 0,
			totalPages: 0,
			loading: false,
			errors: {}
		};
		
		this.avatarsDir = Config.avatarsDir;
		
		this.addComment = this.addComment.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.generateComments = this.generateComments.bind(this);
		this.goToPage = this.goToPage.bind(this);
	}
	
	componentDidMount(){
		this.getComments(this.state.currentPage);
	}
	
	componentDidUpdate(prevProps, prevState) {
		//if the article id has changed - load the new comments data
		if((this.props.articleId !== prevProps.articleId)){
			//load the comments from the first page
			this.goToPage(0);
		}
	}
	
	/**
	 * Clears the form errors related to this input
	 * @param {Object} e
	 */
	clearErrors(e) {
		var field = e.target.name;

		var errors = this.state.errors;
		delete errors[field];
		
		this.setState({
			errors: errors
		});
	}
	
	/**
	 * Returns all article comments
	 * @param {Number} page
	 */
	getComments(page){
		var self = this;
		
		this.setState({
			loading: true
		});
		
		var offset = page * this.state.perPage;
		
		ArticleCommentHttpService.getComments(this.props.articleId, this.state.perPage, offset).then(function (response){
			self.setState({
				comments: response.data.comments,
				total: response.data.total,
				totalPages: Math.ceil(response.data.total / self.state.perPage),
				loading: false
			});
		});
	}
	
	/**
	 * Adds new article comment
	 */
	addComment(){
		var self = this;
		
		var textarea = $(this.refs.content);
		
		ArticleCommentHttpService.addComment(this.props.articleId, textarea.val()).then(function (response){
			if (response.data.errors) {
				self.setState({
					errors: response.data.errors
				});
			}else{				
				self.goToPage(0);
				textarea.val("");
			}
		});
	}
	
	/**
	 * Scrolls the screen back to the top and opens the login modal
	 */
	openLoginModal(){
		$("html, body").animate({scrollTop: 0}, 500, function (){
			$("#login > button").click();
		});
	}
	
	/**
	 * Sets the current page and loads the corresponding comments
	 * @param {Number} page
	 */
	goToPage(page){
		this.setState({
			currentPage: page
		}, function () {
			this.getComments(this.state.currentPage);
		});
	}
	
	/**
	 * Generates the comments html
	 * @returns {String}
	 */
	generateComments(){
		var self = this;
		
		var comments = this.state.comments.map(function (comment){			
			return (
				<div className="comment" key={comment.id}>
					<div className="header">
						<Link to={"/user/"+comment.authorId}>
							<img src={self.avatarsDir+comment.avatar}/>
							<div className="author">
								{comment.username}
							</div>
						</Link>
						<div className="date" title={moment(comment.date).format("YYYY-MM-DD HH:mm:ss")}>
							{moment(comment.date).fromNow()}
						</div>
					</div>
					<div className="clearfix"></div>
					<div className="content">
						{comment.content}
					</div>
				</div>
			);
		});
		
		return comments;
	}
	
	render() {		
		
		var isLoggedIn = this.props.sessionContext.userSession !== null;
		
		return (
			<div className="article-comments">
				<hr/>
				
				{!isLoggedIn && 
					<div className="not-logged-in">
						<img src="/img/icons/warning-icon.png"/>
						You need to be <span onClick={this.openLoginModal}>logged in</span> before you can comment on this article.
					</div>
				}
				
				{isLoggedIn && 
					<div className="form-group">
						<div className="input-group">
							<textarea ref="content" name="content" placeholder="Leave your comment" 
								className={classNames("form-control", {"is-invalid": this.state.errors.content})} 
								onFocus={this.clearErrors}></textarea>
							<div className="input-group-append">
								<button className="btn btn-success" onClick={this.addComment}>
									Submit
								</button>
							</div>
						</div>
						
						<div className="form-error">
							{this.state.errors.content}
						</div>
					</div>
				}
				
				{this.state.total === 0 && 
					<div className="no-comments">
						There are no comments yet.
					</div>
				}

				{this.generateComments()}
				
				{this.state.total > 0 && <Pagination {...this.state} goToPage={this.goToPage}/>}
			</div>
		);
	};
};

export default Session.withConsumer(ArticleComments);