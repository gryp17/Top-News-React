import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./sign-up.scss";

import UserHttpService from "../../../../services/api/user";

import Session from "../../../../contexts/session";

class SignUp extends React.Component {
	
	static propTypes = {
		sessionContext: PropTypes.shape({
			updateSession: PropTypes.func.isRequired
		})
	};
	
	constructor(props){
		super(props);
	
		this.state = {
			errors: {}
		};
	
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.showPreview = this.showPreview.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	
	/**
	 * Opens the bootstrap modal
	 */
	openModal(){
		$(this.refs.modal).modal("show");
	}
	
	/**
	 * Closes the bootstrap modal
	 */
	closeModal(){
		$(this.refs.modal).modal("hide");
	}
	
	/**
	 * Opens the file browser
	 */
	openFileBrowser(){
		$(this.refs.avatar).click();
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
	 * Sign up (and login) the user
	 */
	signUp(){
		var self = this;
				
		var formData = new FormData(this.refs.signUpForm);
				
		UserHttpService.signUp(formData).then(function (response) {
			if (response.data.user) {
				self.closeModal();
				self.props.sessionContext.updateSession(response.data.user);
			}else{				
				self.setState({
					errors: response.data.errors
				});
			}
		});	
	}
		
	render() {
		return (
			<div id="sign-up">
				<button className="btn btn-link" onClick={this.openModal}>Sign Up</button>

				<div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Sign Up</h5>
							</div>
							<div className="modal-body">
								
								<form ref="signUpForm">
								
									<div className="form-group">
										<input name="username" type="text" 
												className={classNames("form-control", {"is-invalid": this.state.errors.username})} 
												placeholder="Username" 
												onFocus={this.clearErrors}/>

										<div className="form-error">
											{this.state.errors.username}
										</div>
									</div>

									<div className="form-group">
										<input name="email" type="text" 
												className={classNames("form-control", {"is-invalid": this.state.errors.email})} 
												placeholder="Email" 
												onFocus={this.clearErrors}/>

										<div className="form-error">
											{this.state.errors.email}
										</div>
									</div>

									<div className="form-group">
										<input name="password" type="password" 
												className={classNames("form-control", {"is-invalid": this.state.errors.password})} 
												placeholder="Password" 
												onFocus={this.clearErrors}/>

										<div className="form-error">
											{this.state.errors.password}
										</div>
									</div>

									<div className="form-group">
										<input name="repeatPassword" type="password" 
												className={classNames("form-control", {"is-invalid": this.state.errors.repeatPassword})} 
												placeholder="Repeat Password" 
												onFocus={this.clearErrors}/>

										<div className="form-error">
											{this.state.errors.repeatPassword}
										</div>
									</div>

									<div className="form-group">
										<div className="avatar-wrapper row">
											<div className="col">
												<label>Avatar (optional)</label>

												<button type="button" className="btn btn-secondary browse-btn" onClick={this.openFileBrowser}>
													<img src="/img/icons/upload-icon.png"/>
													Choose a file
												</button>

												<input ref="avatar" type="file" className="avatar" name="avatar"
													onChange={this.showPreview} 
													onClick={this.clearErrors}/>
												
												<div className="form-error">
													{this.state.errors.avatar}
												</div>
											</div>
											<div className="col">
												<img ref="preview" className="avatar-preview"/>
											</div>
										</div>
									</div>

									<button type="button" className="btn btn-primary-light sign-up-btn" onClick={this.signUp}>
										Sign Up
									</button>

								</form>
								
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default Session.withConsumer(SignUp);