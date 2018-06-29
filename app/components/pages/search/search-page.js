import React from "react";

import "./search-page.scss";

import ArticleHttpService from "../../../services/api/article";
import ArticleBox from "../../common/article-box/article-box";
import LoadingIndicator from "../../common/loading-indicator/loading-indicator";
import ScrollToTop from "../../common/scroll-to-top/scroll-to-top";

class SearchPage extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			loading: false,
			lazyLoading: false,
			section: props.match.params.section,
			searchTerm: decodeURIComponent(props.match.params.searchTerm || "*"),
			limit: 6,
			offset: 0,
			hasMore: false,
			articles: []
		};
		
		this.lazyLoading = this.lazyLoading.bind(this);
	}
	
	componentDidMount(){
		this.getArticles();
		
		$(window).on("scroll", this.lazyLoading);
	}
	
	componentWillUnmount() {
		$(window).off("scroll");
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
	
	/**
	 * Gets all articles that match the state parameters (section, searchTerm, limit, offset...)
	 * @param {Boolean} lazyLoading
	 */
	getArticles(lazyLoading = false){
		var self = this;
		var loadingIndicator = "loading";
		
		if(lazyLoading){
			loadingIndicator = "lazyLoading";
		}
		
		//set the correct loading state to true
		this.setState({[loadingIndicator]: true});
		
		ArticleHttpService.getArticles(this.state.section, this.state.searchTerm, this.state.limit, this.state.offset).then(function (response){
			var articles = response.data;
			
			self.setState({
				[loadingIndicator]: false,
				hasMore: articles.length === self.state.limit,
				articles: self.state.articles.concat(articles)
			});
		});
	}
	
	/**
	 * Lazy loading function that is called whenever the user scrolls the page
	 */
	lazyLoading(){
		
		var scrollTop = $(window).scrollTop();
		var bodyHeight = $("body").height() - 1000;

		//if there is no other lazy loading in progress and there are more articles to be loaded
		if (!this.state.lazyLoading && this.state.hasMore && scrollTop > bodyHeight) {
			this.setState({
				offset: this.state.offset + this.state.limit
			}, function (){
				this.getArticles(true);
			});
		}
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
						
				<ScrollToTop/>
			</div>
		);
	}
};

export default SearchPage;