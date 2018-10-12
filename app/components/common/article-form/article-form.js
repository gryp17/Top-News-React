import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";

import "./article-form.scss";

import ContentEditor from "./content-editor/content-editor";

class ArticleForm extends React.Component {

	static propTypes = {
		article: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		formMode: PropTypes.string.isRequired,
		submitForm: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			article: props.article,
			errors: props.errors
		};

		this.sections = {
			1: "Politics",
			2: "World",
			3: "Technology",
			4: "Economy",
			5: "Sports"
		};

		this.formMode = props.formMode === "create" ? "Add" : "Edit";

		this.handleChange = this.handleChange.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.showPreview = this.showPreview.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentDidUpdate(prevProps, prevState){
		//when the errors prop changes - update the state to reflect the changes
		if(!_.isEqual(this.props.errors, this.state.errors)){
			this.setState({
				errors: this.props.errors
			});
		}
	}

	/**
	 * Generates the section dropdown options
	 * @returns {Array}
	 */
	generateSections(){
		var options = [];

		_.forOwn(this.sections, function (value, key){
			options.push(<option key={key} value={key}>{value}</option>);
		});

		return options;
	}

	/**
	 * Handles all form changes and applies them in the state
	 * @param {Object} e 
	 */
	handleChange(e){
		var article = {...this.state.article};
		article[e.target.name] = e.target.value;

		this.setState({
			article: article
		});
	}

	/**
	 * Updates the article content
	 * @param {String} content 
	 */
	updateContent(content){
		this.setState({
			article: {...this.state.article, content: content}
		});
	}

	/**
	 * Opens the file browser
	 */
	openFileBrowser(){
		$(this.refs.image).click();
	}
	
	/**
	 * Generates a preview of the selected image
	 * @param {Object} e
	 */
	showPreview(e){
		$(this.refs.preview).attr("src", URL.createObjectURL(e.target.files[0]));
	}

	/**
	 * Clears the form errors related to this input
	 * @param {Object} e
	 */
	clearErrors(e) {
		var field = e.target.name;

		var errors = this.state.errors;
		delete errors[field];
		
		this.setState({
			errors: errors
		});
	}

	/**
	 * Submits the form by building the formData object and calling the submitForm prop function
	 */
	submit(){
		var formData = new FormData();

		//build the form data object using the state
		_.forOwn(this.state.article, function (value, key){
			formData.append(key, value);
		});
		
		//append the article image
		formData.append("image", this.refs.image.files[0] || "");

		this.props.submitForm(formData);
	}
	
	render() {

		return (
			<div className="article-form">

				<form>

					<h4>{this.formMode} Article</h4>

					<hr />

					<div className="form-group">
						<label>Section</label>
						<select name="categoryId" value={this.state.article.categoryId} onChange={this.handleChange}
							className={classNames("form-control", {"is-invalid": this.state.errors.categoryId })}
							onFocus={this.clearErrors}>
							{this.generateSections()}
						</select>

						<div className="form-error">
							{this.state.errors.categoryId}
						</div>
					</div>

					<div className="form-group">
						<div className="article-image-wrapper">
							<label>Image</label>

							<img ref="preview" className="image-preview" onClick={this.openFileBrowser} src="/img/placeholder.png"/>

							<button type="button" className="btn btn-secondary browse-btn" onClick={this.openFileBrowser}>
								<img src="/img/icons/upload-icon.png" />
								Choose a file
							</button>

							<input ref="image" type="file" className="article-image" name="image"
								onChange={this.showPreview}
								onClick={this.clearErrors} />

							<div className="form-error">
								{this.state.errors.image}
							</div>
						</div>
					</div>

					<div className="form-group">
						<label>Title</label>
						<textarea name="title" value={this.state.article.title} onChange={this.handleChange}
							className={classNames("form-control title", {"is-invalid": this.state.errors.title })}
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
							className={classNames("form-control summary", {"is-invalid": this.state.errors.summary })}
							placeholder="Summary"
							onFocus={this.clearErrors}></textarea>

						<div className="form-error">
							{this.state.errors.summary}
						</div>
					</div>

					<div className="form-group">
						<label>Content</label>

						<ContentEditor content={this.state.article.content} isInvalid={!!this.state.errors.content}
							onUpdate={this.updateContent}
							onFocus={this.clearErrors} />

						<div className="form-error">
							{this.state.errors.content}
						</div>
					</div>

					<button type="button" className="btn btn-success submit-btn" onClick={this.submit}>
						Save
					</button>

				</form>
			</div>
		);
	}
};

export default ArticleForm;