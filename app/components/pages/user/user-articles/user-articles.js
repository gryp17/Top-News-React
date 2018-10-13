import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import "./user-articles.scss";

import ArticleActions from "../../../common/article-actions/article-actions";
import Pagination from "../../../common/pagination/pagination";

import Config from "../../../../config/config";

var UserArticles = function (props) {
	
    var articlesDir = Config.articlesDir;
    var showActions = props.currentUser && props.currentUser.id === props.user.id;
	
	var articles = props.data.map((article) => {
		return (
			<div className="user-article" key={article.id}>
				<Link to={"/article/"+article.id} title={article.summary}>
					<img src={articlesDir+article.image}/>
					<div className="header">
						{article.categoryName} | {moment(article.date).format("dddd, MMMM D, YYYY")}
					</div>
					<div className="title">
						{article.title}
					</div>
					<div className="clearfix"></div>
				</Link>

				{showActions && <ArticleActions article={article} delete={props.deleteArticle}/>}
			</div>
		);
	});
	
	return (
		<div className="user-articles">

			{props.total === 0 && 
				<div className="no-articles">
					The user hasn't written any articles yet.
				</div>
			}

        	{articles}
		
			{props.total > 0 && <Pagination {...props}/>}
		</div>
	);
};

UserArticles.propTypes = {
	data: PropTypes.array.isRequired,
	perPage: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	goToPage: PropTypes.func.isRequired,
	deleteArticle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
	currentUser: PropTypes.object
};

export default UserArticles;