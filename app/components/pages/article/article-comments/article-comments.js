import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
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
		
		this.maxVisiblePages = 3;
		this.commentsPerPage = 5;
		this.offset = 0;
		
		this.state = {
			comments: [],
			total: 0,
			currentPage: 0,
			loading: false
		};
		
		this.avatarsDir = Config.avatarsDir;
		
		this.generatePagination = this.generatePagination.bind(this);
	}
	
	componentDidMount(){
		this.getComments(this.state.currentPage);
	}
	
	componentDidUpdate(prevProps, prevState) {
		//if the article id has changed - load the new comments data
		if((this.props.articleId !== prevProps.articleId)){
			
			//reset the current page
			this.setState({
				currentPage: 0
			}, function (){
				this.getComments(this.state.currentPage);
			});
			
		}
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
				total: response.data.total,
				loading: false
			});
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
	
	//TODO: finish this
	generatePagination(totalComments){
		var pagesCount = Math.floor(totalComments / this.commentsPerPage) + 1;
		
		var pages = [];
		
		for(var i = 0; i < pagesCount; i++){
			pages.push(
				(
					<button key={i}>{i + 1}</button>
				)
			);
		}
		
		console.log(pagesCount);
		
		return pages;
	}

	render() {
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
		
		var pages = this.generatePagination(this.state.total);
		
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
					<div className="input-group">
						<textarea className="form-control" placeholder="Leave your comment"></textarea>
						<div className="input-group-append">
							<button className="btn btn-success">Submit</button>
						</div>
					</div>
				}
				
				{this.state.total === 0 && 
					<div className="no-comments">
						There are no comments yet.
					</div>
				}

				{comments}
						
				{this.state.total > this.commentsPerPage &&
					<div className="pagination">
						<button>
							First
						</button>
						<button>
							Prev
						</button>
						
						{pages}
						
						<button>
							Next
						</button>
						<button>
							Last
						</button>
					</div>
				}
			</div>
		);
	};
};

export default ArticleComments;