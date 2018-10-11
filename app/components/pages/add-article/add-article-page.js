import React from "react";
import PropTypes from "prop-types";

import Session from "../../../contexts/session";

import Forbidden from "../../common/forbidden/forbidden";
import ArticleForm from "../../common/article-form/article-form";
import ArticleHttpService from "../../../services/api/article";

class AddArticlePage extends React.Component {

    static propTypes = {
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object
		})
	};

	constructor(props) {
		super(props);

		this.state = {
			article: {
				categoryId: 1,
				title: "",
				summary: "",
				content: "some default content <strong>test</strong>"
			},
			errors: {
				summary: "some error",
				content: "test error"
			},
			loading: false
		};

		this.addArticle = this.addArticle.bind(this);
	}

	addArticle(article){
		console.log("adding new article");
		console.log(article);
	}
	
	render() {

        var sessionContext = this.props.sessionContext;
        var isAdmin = (sessionContext.userSession && sessionContext.userSession.type === "admin");

		return (
			<div id="add-article-page">

				{!isAdmin && <Forbidden/>}
				
                {isAdmin && <ArticleForm article={this.state.article} errors={this.state.errors} formMode="create" submitForm={this.addArticle}/>}

			</div>
		);
	}
};

export default Session.withConsumer(AddArticlePage);