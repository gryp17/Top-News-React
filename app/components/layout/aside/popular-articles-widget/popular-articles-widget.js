import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./popular-articles-widget.scss";

import ArticleHttpService from "../../../../services/api/article";
import LoadingIndicator from "../../../common/loading-indicator/loading-indicator";
import FadeIn from "../../../common/animations/fade-in/fade-in";

class PopularArticlesWidget extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			periods: [
				"today",
				"this week",
				"all time"
			],
			selectedPeriod: "today",
			loading: false,
			articles: []
		};
		
		this.changePeriod = this.changePeriod.bind(this);
		this.loadArticles = this.loadArticles.bind(this);
	}
	
	componentDidMount(){
		this.loadArticles();
	}
	
	/**
	 * Loads the most popular articles from the selected period
	 */
	loadArticles(){
		var self = this;
		
		this.setState({
			loading: true
		});
		
		ArticleHttpService.getMostPopular(this.state.selectedPeriod, 5).then(function (response){
			self.setState({
				loading: false,
				articles: response.data
			});
		});
	}
	
	/**
	 * Changes the selected period and loads the new articles data
	 * @param {String} period
	 */
	changePeriod(period){
		this.setState({
			selectedPeriod: period
		}, this.loadArticles);
	}

	render() {
		var self = this;
		
		var periods = this.state.periods.map(function (period, index){
			return (
				<button type="button" key={index} className={classNames("btn btn-light col-4", {"active": self.state.selectedPeriod === period})} 
						onClick={self.changePeriod.bind(null, period)}>
					{period}
				</button>
			);
		});
		
		var articles = this.state.articles.map(function (article, index){
			return (
				<div className="item" key={article.id}>
					<div className="position">{index + 1}</div> <Link to={"/article/"+article.id}>{article.title}</Link>
				</div>
			);
		});
		
		return (
			<div className="popular-articles-widget">
	
				<div className="title">
					Popular articles
				</div>
	
				<div className="btn-group btn-group-sm row no-gutters" role="group">
					{periods}
				</div>
				
				{this.state.loading && <LoadingIndicator/>}
				{!this.state.loading && 
					<FadeIn>
						<div className="articles-wrapper">
							{articles}
						</div>
					</FadeIn>
				}
			</div>
		);
	}
};

export default PopularArticlesWidget;