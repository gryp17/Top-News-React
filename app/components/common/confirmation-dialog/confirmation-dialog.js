import React from "react";
import PropTypes from "prop-types";

import "./confirmation-dialog.scss";

class ConfirmationDialog extends React.Component {
	
	static propTypes = {
		message: PropTypes.string.isRequired,
		confirm: PropTypes.func.isRequired
	};
	
	constructor(props){
		super(props);
		
		this.openModal = this.openModal.bind(this);
	}
	
	componentDidMount(){

		//on modal close - call the confirm callback
		$(this.refs.modal).on("hidden.bs.modal", () => {
			this.props.confirm(false);
		});

		//open the modal as soon as this component is mounted
		this.openModal();
	}
	
	componentWillUnmount(){
		$(this.refs.modal).off("hidden.bs.modal");
	}
	
	/**
	 * Opens the bootstrap modal
	 */
	openModal(){
		$(this.refs.modal).modal("show");
	}
		
	render() {
		return (
			<div className="confirmation-dialog">

				<div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Confirm Action</h5>
							</div>
							<div className="modal-body">
								{this.props.message}
							</div>
							<div className="modal-footer">
								<button className="btn btn-success" data-dismiss="modal" onClick={this.props.confirm.bind(null, true)}>
									Confirm
								</button>
								<button className="btn btn-danger" data-dismiss="modal">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
						
			</div>
		);
	}
};

export default ConfirmationDialog;