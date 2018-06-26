import React from "react";

import "./home-page.scss";

import ArticlesHttpService from "../../../services/api/article";
import ArticleBox from "../../common/article-box/article-box";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";

class HomePage extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			loading: false,
			section: "all news",
			searchTerm: "*",
			limit: 6,
			offset: 0,
			articles: []
		};
	}
	
	componentDidMount(){
		this.getArticles();
	}
	
	getArticles(){
		var self = this;
		
		this.setState({loading: true});
		
		ArticlesHttpService.getArticles(this.state.section, this.state.searchTerm, this.state.limit, this.state.offset).then(function (articles){
			self.setState({
				articles: articles,
				loading: false
			});
		});
	}
	
	search(text) {
		console.log("TEXT FROM THE SEARCH BAR "+text);
	}
	
	render() {
		
		var content;
		
		if(this.state.loading){
			content = <LoadingIndicator/>;
		}else{
			var articles = this.state.articles.map(function (article){
				return (
					<div className="col-12 col-sm-6" key={article.id}>
						<ArticleBox article={article}/>
					</div>
				);
			});
			
			content = <div className="row no-gutters articles-wrapper">{articles}</div>;
		}
		
		return (
			<div id="home-page">
				{content}
			</div>
		);
	}
};

export default HomePage;