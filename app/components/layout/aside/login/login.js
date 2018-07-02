import React from "react";
import PropTypes from "prop-types";

import "./login.scss";

import UserHttpService from "../../../../services/api/user";

class Login extends React.Component {
	
	static propTypes = {
		updateSession: PropTypes.func.isRequired
	};
	
	constructor(props){
		super(props);
	
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
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
	 * @param {Object} e
	 */
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.login();
		}
	}
	
	/**
	 * Tries to authenticate the user with the provided credentials
	 */
	login(){
		var self = this;
		
		UserHttpService.login(this.refs.username.value, this.refs.password.value).then(function (response) {
			if (response.data.user) {
				self.closeModal();
				self.props.updateSession(response.data.user);
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
								
								<div className="input-group username">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<img src="/img/user-icon.png"/>
										</span>
									</div>
									<input ref="username" type="text" className="form-control" placeholder="Username" onKeyPress={this.handleKeyPress}/>
								</div>
								
								<div className="input-group password">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<img src="/img/password-icon.png"/>
										</span>
									</div>
									<input ref="password" type="password" className="form-control" placeholder="Password" onKeyPress={this.handleKeyPress}/>
								</div>
								
								<button type="button" className="btn btn-primary-light" onClick={this.login}>LOGIN</button>
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default Login;