import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import "./user-articles.scss";

import Config from "../../../../config/config";

var UserArticles = function (props) {
	
	var articlesDir = Config.articlesDir;
	
	var articles = props.articles.map((article) => {
		return (
			<div className="user-article">
				<Link to={"/article/"+article.id} title={article.summary}>
					<img src={articlesDir+article.image}/>
					<div className="header">{article.categoryName} | {moment(article.date).format("dddd, MMMM D, YYYY")}</div>
					<div className="title">
						{article.title}
					</div>
					<div className="clearfix"></div>
				</Link>
			</div>
		);
	});
	
	
	return (
		<div className="user-articles">
			<h4>User Articles</h4>
			
			{articles}
			
			<div>Pagination goes here</div>
			
		</div>
	);
};

UserArticles.propTypes = {
	articles: PropTypes.array.isRequired
};

export default UserArticles;