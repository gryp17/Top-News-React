import React from "react";

import "./article-page.scss";

import ArticleHttpService from "../../../services/api/article";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import ScrollToTop from "../../common/scroll-to-top/scroll-to-top";
import Article from "./article/article";
import NotFound from "./not-found/not-found";
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
	}
		
	componentDidUpdate(prevProps, prevState) {
		//if the id parameter has changed - load the new article data
		if((this.props.match.params.id !== prevProps.match.params.id)){
			$(window).scrollTop(0);
			this.getArticle(this.props.match.params.id);
		}
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
				
				{this.state.article && <ArticlesSlider authorId={this.state.article.authorId}></ArticlesSlider>}

				<ArticleComments articleId={parseInt(this.props.match.params.id)}/>
						
				<ScrollToTop/>
			</div>
		);
	}
};

export default ArticlePage;