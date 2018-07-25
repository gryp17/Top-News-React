import React from "react";
import PropTypes from "prop-types";

import "./article-comments.scss";

import ArticleCommentHttpService from "../../../../services/api/article-comment";

class ArticleComments extends React.Component {
	
	static propTypes = {
		articleId: PropTypes.number.isRequired,
		userSession: PropTypes.object
	};

	constructor(props) {
		super(props);
		
		this.commentsPerPage = 5;
		this.offset = 0;
		
		this.state = {
			comments: [],
			total: 0,
			loading: false
		};
	}
	
	componentDidMount(){
		this.getComments(this.props.articleId, this.commentsPerPage, this.offset);
	}
	
	componentDidUpdate(prevProps, prevState) {
		//if the article id has changed - load the new comments data
		if((this.props.articleId !== prevProps.articleId)){
			this.getComments(this.props.articleId, this.commentsPerPage, this.offset);
		}
	}
	
	/**
	 * Returns all article comments
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 */
	getComments(articleId, limit, offset){
		var self = this;
		
		this.setState({
			loading: true
		});
		
		ArticleCommentHttpService.getComments(articleId, limit, offset).then(function (response){
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

				{JSON.stringify(this.state.comments)}
			</div>
		);
	};
};

export default ArticleComments;