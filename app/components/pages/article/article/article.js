import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

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
		this.avatarsDir = Config.avatarsDir;
	}

	render() {
		
		var htmlContent = {__html: this.props.article.content};
		
		return (
			<FadeIn>
				<div className="article">
					<div className="title">{this.props.article.title}</div>
					<img className="img-fluid image" src={this.articlesDir + this.props.article.image}/>
					<div className="info row">
						<div className="date col-sm-6">
							{moment(this.props.article.date).format("dddd, MMMM D, YYYY")}
						</div>
						
						<div className="author text-sm-right col-sm-6">
							written by 
							<Link to={"/user/"+this.props.article.authorId}>
								<img src={this.avatarsDir + this.props.article.authorAvatar}/>
								{this.props.article.authorName}
							</Link>
						</div>
						
						<div className="views col-12">
							<div className="badge badge-secondary">
								<img src="/img/icons/views-icon.png"/>
								{this.props.article.views} views
							</div>
						</div>
					</div>
					
					<hr/>
					
					<div className="content" dangerouslySetInnerHTML={htmlContent}></div>
						
					<Link to={"/search/"+this.props.article.categoryName} className="btn btn-outline-dark back-btn">
						<img className="black" src="/img/icons/back-icon.png"/>
						<img className="white" src="/img/icons/back-icon-white.png"/>
						Back to <span>{this.props.article.categoryName}</span>
					</Link>
					
					<div className="clearfix"></div>
				
				</div>
			</FadeIn>
		);
	};
};

export default Article;