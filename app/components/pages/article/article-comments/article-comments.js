import React from "react";
import PropTypes from "prop-types";

import "./article-comments.scss";

import ArticleCommentHttpService from "../../../../services/api/article-comment";

class ArticleComments extends React.Component {
	
	static propTypes = {
		articleId: PropTypes.number.isRequired
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

	render() {			
		return (
			<div className="article-comments">
				<hr/>
				
				article commments go here {this.props.articleId}
						
				{JSON.stringify(this.state.comments)}
			</div>
		);
	};
};

export default ArticleComments;