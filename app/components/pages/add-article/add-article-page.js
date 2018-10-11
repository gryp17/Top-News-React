import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";

import "./add-article-page.scss";

import Session from "../../../contexts/session";

import Forbidden from "../../common/forbidden/forbidden";
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
				content: ""
			},
			errors: {},
			loading: false
		};

		this.sections = {
			1: "Politics",
			2: "Economy",
			3: "World",
			4: "Technology",
			5: "Sports"
		}

		this.handleChange = this.handleChange.bind(this);
		this.saveArticle = this.saveArticle.bind(this);
	}

	generateSections(){
		var options = [];

		_.forOwn(this.sections, function (value, key){
			options.push(<option key={key} value={key}>{value}</option>);
		});

		return options;
	}

	handleChange(e){
		var article = {...this.state.article};
		article[e.target.name] = e.target.value;

		this.setState({
			article: article
		});
	}

	saveArticle(){

	}
	
	render() {

        var sessionContext = this.props.sessionContext;
        var isAdmin = (sessionContext.userSession && sessionContext.userSession.type === "admin");

		return (
			<div id="add-article-page">

				{!isAdmin && <Forbidden/>}
				
                {isAdmin && 
					<form ref="addArticleForm">

						<h4>Add Article</h4>

						<hr/>

						<div className="form-group">
							<label>Section</label>
							<select name="categoryId" value={this.state.article.categoryId} onChange={this.handleChange}
								className="form-control">

								{this.generateSections()}

							</select>
						</div>

						<div className="form-group">
							<label>Title</label>
							<textarea name="title" value={this.state.article.title} onChange={this.handleChange}
								className={classNames("form-control title", {"is-invalid": this.state.errors.title})}
								placeholder="Title"
								onFocus={this.clearErrors}></textarea>

							<div className="form-error">
								{this.state.errors.title}
							</div>
						</div>

						<div className="form-group">
							<label>Summary</label>
							<textarea name="summary" value={this.state.article.summary} onChange={this.handleChange}
								rows="3"
								className={classNames("form-control summary", {"is-invalid": this.state.errors.summary})}
								placeholder="Summary"
								onFocus={this.clearErrors}></textarea>

							<div className="form-error">
								{this.state.errors.summary}
							</div>
						</div>

						<div className="form-group">
							<label>Content</label>
							<textarea name="content" value={this.state.article.content} onChange={this.handleChange}
								rows="20"
								className={classNames("form-control summary", {"is-invalid": this.state.errors.content})}
								placeholder="Content"
								onFocus={this.clearErrors}></textarea>

							<div className="form-error">
								{this.state.errors.content}
							</div>
						</div>


						<button type="button" className="btn btn-success submit-btn" onClick={this.saveArticle}>
							Submit
						</button>

					</form>
				}

			</div>
		);
	}
};

export default Session.withConsumer(AddArticlePage);