import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import moment from "moment";

import Utils from "../../../services/utils";

import "./article-box.scss";

class ArticleBox extends React.Component {
	
	static propTypes = {
		article: PropTypes.object.isRequired
	};
	
	constructor(props){
		super(props);
		
		this.imagesDir = "/uploads/articles/";
	}
		
	render() {
				
		return (
			<CSSTransition in appear={true} timeout={300} classNames="fade">
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
						<img className="img-fluid" src={this.imagesDir+this.props.article.image}/>
					</Link>

					<div className="content-wrapper">
						<div className="title">
							<Link to={"/article/"+this.props.article.id}>
								{this.props.article.title}
							</Link>
						</div>
						<div className="summary">
							{Utils.limitTo(this.props.article.summary, 150)}
						</div>

						<Link to={"/article/"+this.props.article.id} className="btn btn-primary-light">
							Read more
						</Link>

						<div className="clearfix"></div>
					</div>
				</div>
			</CSSTransition>
		);
	}
};

export default ArticleBox;