import React from "react";

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
								
								sign up form
								
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default SignUp;