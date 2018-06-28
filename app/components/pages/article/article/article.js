import React from "react";
import PropTypes from "prop-types";

import Config from "../../../../config/config";
import FadeIn from "../../../common/animations/fade-in/fade-in";

import "./article.scss";

class Article extends React.Component {
	
	static propTypes = {
		article: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		
		this.articlesDir = Config.articlesDir;
	}

	render() {
		
		var htmlContent = {__html: this.props.article.content};
		
		return (
			<FadeIn>
				<div className="article">
					<div className="title">{this.props.article.title}</div>
					<img className="img-fluid image" src={this.articlesDir + this.props.article.image}/>
					<div className="info">
						{this.props.article.date}
						---
						{this.props.article.categoryName}
						---
						{this.props.article.authorName}
						---
						{this.props.article.views}
						<hr/>
					</div>
					<div className="content" dangerouslySetInnerHTML={htmlContent}></div>
				</div>
			</FadeIn>
		);
	};
};

export default Article;