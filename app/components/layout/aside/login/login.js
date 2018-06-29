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
		this.login = this.login.bind(this);
	}
	
	/**
	 * Opens the bootstrap modal
	 */
	openModal(){
		$(this.refs.modal).modal("show");
	}
	
	/**
	 * Tries to authenticate the user with the provided credentials
	 */
	login(){
		var self = this;
		
		UserHttpService.login("admin", 1234).then(function (response) {
			if (response.data.user) {
				self.props.updateSession(response.data.user);
			}
		});	
	}
	
	render() {
		return (
			<div id="login">
				<button onClick={this.openModal}>Login</button>

				<div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								body
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.login}>LOGIN</button>
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default Login;