import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./latest-articles-widget.scss";

import Config from "../../../../config/config";
import ArticleHttpService from "../../../../services/api/article";
import LoadingIndicator from "../../../common/loading-indicator/loading-indicator";
import FadeIn from "../../../common/animations/fade-in/fade-in";

class LatestArticlesWidget extends React.Component {

	constructor(props){
		super(props);
		
		this.articlesDir = Config.articlesDir;
		
		this.state = {
			loading: false,
			articles: []
		};
		
		this.loadArticles = this.loadArticles.bind(this);
	}
	
	componentDidMount(){
		this.loadArticles();
	}
	
	/**
	 * Loads the latest articles
	 */
	loadArticles(){
		var self = this;
		
		this.setState({
			loading: true
		});
		
		ArticleHttpService.getArticles("all news", "*", 5, 0).then(function (response){
			self.setState({
				loading: false,
				articles: response.data
			});
		});
	}
	
	render() {
		var self = this;
		
		var indicators = this.state.articles.map(function (article, index){
			return (
				<li data-target="#articlesCarousel" key={article.id} data-slide-to={index} className={classNames({"active": index === 0})}></li>
			);
		});
		
		var articles = this.state.articles.map(function (article, index){
			return (
				<div key={article.id} className={classNames("carousel-item", {"active": index === 0})}>
					<img src={self.articlesDir + article.image}/>
					<div className="carousel-caption d-none d-md-block">
						<Link to={"/article/"+article.id}>{article.title}</Link>
					</div>
				</div>
			);
		});
		
		return (
			<div className="latest-articles-widget">
				
				<div className="title">
					Latest articles
				</div>
				
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && 
					<FadeIn>
						<div id="articlesCarousel" className="carousel slide" data-ride="carousel">
							<ol className="carousel-indicators">
								{indicators}
							</ol>
							
							<div className="carousel-inner">
								{articles}
							</div>
							
							<a className="carousel-control-prev" href="#articlesCarousel" role="button" data-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="sr-only">Previous</span>
							</a>
							<a className="carousel-control-next" href="#articlesCarousel" role="button" data-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="sr-only">Next</span>
							</a>
						</div>
					</FadeIn>
				}					
						
			</div>
		);
	}
};

export default LatestArticlesWidget;