import React from "react";

import "./search-page.scss";

import ArticleHttpService from "../../../services/api/article";
import ArticleBox from "../../common/article-box/article-box";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";

class SearchPage extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			loading: false,
			section: props.match.params.section,
			searchTerm: decodeURIComponent(props.match.params.searchTerm || "*"),
			limit: 6,
			offset: 0,
			articles: []
		};
	}
	
	componentDidMount(){
		this.getArticles();
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		var updatedState = null;

		//compare the new section with the old one (saved in the state)
		if(nextProps.match.params.section !== prevState.section){			
			//update the section, reset the offset and the articles list
			updatedState = {
				section: nextProps.match.params.section,
				offset: 0,
				articles: []
			};	
		}
		
		//compare the new search term with the old one
		var newSearchTerm = decodeURIComponent(nextProps.match.params.searchTerm || "*");
		if(newSearchTerm !== prevState.searchTerm){
			//update the search term, reset the offset and the articles list
			updatedState = {
				searchTerm: newSearchTerm,
				offset: 0,
				articles: []
			};
		}
		
		return updatedState;
	}
	
	componentDidUpdate(prevProps, prevState) {		
		//check if the section/searchTerm parameters have changed - and reload the articles
		if((this.props.match.params.section !== prevProps.match.params.section) || (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm)){
			this.getArticles();
		}
	}
	
	getArticles(){
		var self = this;
		
		this.setState({loading: true});
		
		ArticleHttpService.getArticles(this.state.section, this.state.searchTerm, this.state.limit, this.state.offset).then(function (articles){
			self.setState({
				articles: articles,
				loading: false
			});
		});
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
			<div id="search-page">
				{content}
			</div>
		);
	}
};

export default SearchPage;