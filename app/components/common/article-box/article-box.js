import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import Config from "../../../config/config";
import Utils from "../../../services/utils";
import FadeIn from "../animations/fade-in/fade-in";

import "./article-box.scss";

class ArticleBox extends React.Component {
	
	static propTypes = {
		article: PropTypes.object.isRequired
	};
	
	constructor(props){
		super(props);
		
		this.articlesDir = Config.articlesDir;
	}
		
	render() {
				
		return (
			<FadeIn>
				<div className="article-box">
					<Link to={"/article/"+this.props.article.id} className="image-wrapper">
						<div className="section-bar">
							<span className="section">
								{this.props.article.categoryName}
							</span>
							<span className="date">
								{moment(this.props.article.date).format("YYYY-MM-DD")}
							</span>
						</div>
						<img className="img-fluid" src={this.articlesDir+this.props.article.image}/>
					</Link>

					<div className="content-wrapper">
						<div className="title">
							<Link to={"/article/"+this.props.article.id}>
								{Utils.limitTo(this.props.article.title, 55)}
							</Link>
						</div>
						<div className="summary">
							{Utils.limitTo(this.props.article.summary, 150)}
						</div>

						<Link to={"/article/"+this.props.article.id} className="btn btn-primary-light">
							Read more
						</Link>
					</div>
				</div>
			</FadeIn>
		);
	}
};

export default ArticleBox;