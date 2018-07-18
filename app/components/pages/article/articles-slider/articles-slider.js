import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import Config from "../../../../config/config";

import "./articles-slider.scss";

class ArticlesSlider extends React.Component {
	
	static propTypes = {
		articles: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		
		this.articlesDir = Config.articlesDir;
	}
	
	render() {
		var self = this;
		
		//TODO:
		//add mouse scroll event for moving the slider left or right
		
		var width = $(this.refs.wrapper).width();
		
		//set the slider size based on the articles count
		$(this.refs.slider).width(this.props.articles.length * 220);
		
		//maybe add an interval that rotates the slides like this?
		//on window resize - reset all margins and start from the first slide again
		setTimeout(function (){
			$(self.refs.slider).animate({marginLeft: -220}, 500);
		}, 3000);
		
		var articles = this.props.articles.map(function (article){
			return (
				<div className="slide" key={article.id}>
					<img className="img-fluid image" src={self.articlesDir + article.image}/>
					<div className="summary">
						{article.summary}
					</div>
				</div>
			);
		});
		
		return (
			<div className="articles-slider" ref="wrapper">
				<div className="slider" ref="slider">
					{articles}
				</div>
			</div>
		);
	};
};

export default ArticlesSlider;