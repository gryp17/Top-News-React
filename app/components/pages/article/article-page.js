import React from "react";
import PropTypes from "prop-types";

import "./article-page.scss";

import ArticleHttpService from "../../../services/api/article";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import ScrollToTop from "../../common/scroll-to-top/scroll-to-top";
import Article from "./article/article";
import NotFound from "../../common/not-found/not-found";
import ArticlesSlider from "./articles-slider/articles-slider";
import ArticleComments from "./article-comments/article-comments";

class ArticlePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			article: null
		};
	}

	componentDidMount() {
		this.getArticle(this.props.match.params.id);
		$(window).scrollTop(0);
	}
	
	/**
	 * Get the article that matches the specified id
	 * @param {Number} id
	 */
	getArticle(id) {
		var self = this;

		this.setState({loading: true});

		ArticleHttpService.getArticleById(id).then(function (response) {
			self.setState({
				loading: false,
				article: response.data
			});
		});
	}
	
	render() {
		return (
			<div id="article-page">
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && !this.state.article && <NotFound/>}
				
				{this.state.article && <Article article={this.state.article}/>}
				
				{this.state.article && <ArticlesSlider authorId={this.state.article.authorId} />}

				{this.state.article && <ArticleComments articleId={parseInt(this.props.match.params.id)}/>}
				
				<ScrollToTop/>
			</div>
		);
	}
};

export default ArticlePage;