import React from "react";
import classNames from "classnames";

import "./sign-up.scss";

import UserHttpService from "../../../../services/api/user";

class SignUp extends React.Component {
	
	constructor(props){
		super(props);
	
		this.state = {
			errors: {}
		};
	
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openFileBrowser = this.openFileBrowser.bind(this);
		this.showPreview = this.showPreview.bind(this);
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
								
								<div className="form-group">
									<input ref="username" name="username" type="text" 
											className={classNames("form-control", {"is-invalid": this.state.errors.username})} 
											placeholder="Username" 
											onFocus={this.clearErrors}/>

									<div className="form-error">
										{this.state.errors.username}
									</div>
								</div>
								
								<div className="form-group">
									<input ref="email" name="email" type="text" 
											className={classNames("form-control", {"is-invalid": this.state.errors.email})} 
											placeholder="Email" 
											onFocus={this.clearErrors}/>

									<div className="form-error">
										{this.state.errors.email}
									</div>
								</div>
								
								<div className="form-group">
									<input ref="password" name="password" type="password" 
											className={classNames("form-control", {"is-invalid": this.state.errors.password})} 
											placeholder="Password" 
											onFocus={this.clearErrors}/>

									<div className="form-error">
										{this.state.errors.password}
									</div>
								</div>
								
								<div className="form-group">
									<input ref="repeatPassword" name="repeatPassword" type="password" 
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
												<img src="/img/upload-icon.png"/>
												Choose a file
											</button>

											<input ref="avatar" type="file" className="avatar" name="avatar" onChange={this.showPreview} />
										</div>
										<div className="col">
											<img ref="preview" className="avatar-preview"/>
										</div>
									</div>
								</div>
								
								<button className="btn btn-primary-light sign-up-btn">
									Sign Up
								</button>
								
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default SignUp;