import React from "react";

import "./article-page.scss";

import ArticleHttpService from "../../../services/api/article";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import ScrollToTop from "../../common/scroll-to-top/scroll-to-top";
import Article from "./article/article";
import NotFound from "./not-found/not-found";

class ArticlePage extends React.Component {

	constructor(props) {
		super(props);

		this.imagesDir = "/uploads/articles/";

		this.state = {
			loading: true,
			article: null
		};
	}

	componentDidMount() {
		this.getArticle(this.props.match.params.id);
	}

	getArticle(id) {
		var self = this;

		this.setState({loading: true});

		ArticleHttpService.getArticleById(id).then(function (article) {
			self.setState({
				loading: false,
				article: article
			});
		});
	}

	render() {
		return (
			<div id="article-page">
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && !this.state.article && <NotFound/>}
				{this.state.article && <Article article={this.state.article}/>}
						
				<ScrollToTop/>
			</div>
		);
	}
};

export default ArticlePage;