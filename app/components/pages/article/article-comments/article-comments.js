import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import "./article-comments.scss";

import Config from "../../../../config/config";
import ArticleCommentHttpService from "../../../../services/api/article-comment";

class ArticleComments extends React.Component {
	
	static propTypes = {
		articleId: PropTypes.number.isRequired,
		userSession: PropTypes.object
	};

	constructor(props) {
		super(props);
		
		this.commentsPerPage = 5;
		
		this.state = {
			comments: [],
			totalComments: 0,
			currentPage: 0,
			totalPages: 0,
			loading: false,
			errors: {}
		};
		
		this.avatarsDir = Config.avatarsDir;
		
		this.addComment = this.addComment.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.generateComments = this.generateComments.bind(this);
		this.generatePagination = this.generatePagination.bind(this);
		this.goToFirstPage = this.goToFirstPage.bind(this);
		this.goToLastPage = this.goToLastPage.bind(this);
		this.goToNextPage = this.goToNextPage.bind(this);
		this.goToPreviousPage = this.goToPreviousPage.bind(this);
		this.goToPage = this.goToPage.bind(this);
	}
	
	componentDidMount(){
		this.getComments(this.state.currentPage);
	}
	
	componentDidUpdate(prevProps, prevState) {
		//if the article id has changed - load the new comments data
		if((this.props.articleId !== prevProps.articleId)){
			//load the comments from the first page
			this.goToFirstPage();
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
		
		var offset = page * this.commentsPerPage;
		
		ArticleCommentHttpService.getComments(this.props.articleId, this.commentsPerPage, offset).then(function (response){
			self.setState({
				comments: response.data.comments,
				totalComments: response.data.total,
				totalPages: Math.ceil(response.data.total / self.commentsPerPage),
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
				self.goToFirstPage();
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
	 * Loads the comments from the first page
	 */
	goToFirstPage(){
		this.goToPage(0);
	}
	
	/**
	 * Loads the comments from the last page
	 */
	goToLastPage(){
		this.goToPage(this.state.totalPages - 1);
	}
	
	/**
	 * Loads the comments from the next page
	 */
	goToNextPage(){
		var nextPage = this.state.currentPage + 1;
		
		if(nextPage < this.state.totalPages){
			this.goToPage(this.state.currentPage + 1);
		}
	}
	
	/**
	 * Loads the comments from the previous page
	 */
	goToPreviousPage(){
		var previousPage = this.state.currentPage - 1;
		
		if(previousPage >= 0){
			this.goToPage(this.state.currentPage - 1);
		}
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
	
	/**
	 * Generates the pagination html
	 * @returns {String}
	 */
	generatePagination(){
		var pages = [];
		
		var start = 0;
		var end = 0;

		if(this.state.currentPage === 0){
			start = this.state.currentPage;
			end = Math.min(this.state.currentPage + 2, this.state.totalPages - 1);
		}else if (this.state.currentPage === this.state.totalPages - 1){
			start = Math.max(this.state.currentPage - 2, 0);
			end = this.state.currentPage;
		}else{
			start = this.state.currentPage - 1;
			end = this.state.currentPage + 1;
		}
		
		for(var i = start; i <= end; i++){
			 pages.push(
				 (
					 <button className={classNames("btn btn-secondary", {"active": this.state.currentPage === i})} key={i}
							 onClick={this.goToPage.bind(null, i)}>{i + 1}</button>
				 )
			 );
		}
	   
		return (
			<div className="pagination">
				<button className="btn btn-secondary" disabled={this.state.currentPage === 0} onClick={this.goToFirstPage} title="First Page">
					&lt;&lt;
				</button>

				<button className="btn btn-secondary" disabled={this.state.currentPage === 0} onClick={this.goToPreviousPage} title="Previous Page">
					&lt;
				</button>

				{pages}

				<button className="btn btn-secondary" disabled={this.state.currentPage === this.state.totalPages - 1} onClick={this.goToNextPage} title="Next Page">
					&gt;
				</button>

				<button className="btn btn-secondary" disabled={this.state.currentPage === this.state.totalPages - 1} onClick={this.goToLastPage} title="Last Page">
					&gt;&gt;
				</button>
			</div>
		);
	}

	render() {				
		return (
			<div className="article-comments">
				<hr/>
				
				{!this.props.userSession && 
					<div className="not-logged-in">
						<img src="/img/icons/warning-icon.png"/>
						You need to be <span onClick={this.openLoginModal}>logged in</span> before you can comment on this article.
					</div>
				}
				
				{this.props.userSession && 
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
				
				{this.state.totalComments === 0 && 
					<div className="no-comments">
						There are no comments yet.
					</div>
				}

				{this.generateComments()}
						
				{this.state.totalComments > 0 && this.generatePagination()}
			</div>
		);
	};
};

export default ArticleComments;