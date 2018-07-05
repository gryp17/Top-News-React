import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./login.scss";

import UserHttpService from "../../../../services/api/user";

class Login extends React.Component {
	
	static propTypes = {
		updateSession: PropTypes.func.isRequired
	};
	
	constructor(props){
		super(props);
	
		this.state = {
			errors: {}
		};
	
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.login = this.login.bind(this);
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
	 * Checks if the "Enter" key was pressed and calls the login function
	 * Also clears the form errors
	 * @param {Object} e
	 */
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.login();
		}else{
			this.clearErrors(e);
		}
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
	 * Tries to authenticate the user with the provided credentials
	 */
	login(){
		var self = this;
		
		UserHttpService.login(this.refs.username.value, this.refs.password.value, this.refs.rememberMe.checked).then(function (response) {
			if (response.data.user) {
				self.closeModal();
				self.props.updateSession(response.data.user);
			}else{				
				self.setState({
					errors: response.data.errors
				});
			}
		});	
	}
	
	render() {
		return (
			<div id="login">
				<button className="btn btn-link" onClick={this.openModal}>Login</button>

				<div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Login</h5>
							</div>
							<div className="modal-body">
								
								<div className="form-group">
									<div className="input-group username">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<img src="/img/user-icon.png"/>
											</span>
										</div>
										<input ref="username" name="username" type="text" 
												className={classNames("form-control", {"is-invalid": this.state.errors.username})} 
												placeholder="Username" 
												onFocus={this.clearErrors} 
												onKeyPress={this.handleKeyPress}/>
									</div>

									<div className="form-error">
										{this.state.errors.username}
									</div>
								</div>
								
							
								<div className="form-group">
									<div className="input-group password">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<img src="/img/password-icon.png"/>
											</span>
										</div>
										<input ref="password" name="password" type="password" 
												className={classNames("form-control", {"is-invalid": this.state.errors.password})} 
												placeholder="Password" 
												onFocus={this.clearErrors} 
												onKeyPress={this.handleKeyPress}/>
									</div>

									<div className="form-error">
										{this.state.errors.password}
									</div>
								</div>
								
								<div className="form-group">
									<input ref="rememberMe" type="checkbox" id="remember-me-checkbox"/>
									<label htmlFor="remember-me-checkbox">
										Remember me?
									</label>
									
									<button type="button" className="btn btn-primary-light" onClick={this.login}>
										Login
									</button>
								</div>
								
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default Login;