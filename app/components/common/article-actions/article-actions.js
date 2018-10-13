import React from "react";
import PropTypes from "prop-types";

import "./article-actions.scss";

import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";

class ArticleActions extends React.Component {
		
	static propTypes = {
		article: PropTypes.object.isRequired,
        delete: PropTypes.func.isRequired,
	};

	constructor(props){
		super(props);
	
		this.state = {
			showConfirmationDialog: false
		};
		
		this.showConfirmationDialog = this.showConfirmationDialog.bind(this);
		this.hideConfirmationDialog = this.hideConfirmationDialog.bind(this);
		this.confirmAction = this.confirmAction.bind(this);
	}

	/**
	 * Shows the confirmation dialob
	 */
	showConfirmationDialog(){
		this.setState({
			showConfirmationDialog: true
		});
	}

	/**
	 * Hides the confirmation dialog
	 */
	hideConfirmationDialog(){
		this.setState({
			showConfirmationDialog: false
		});
	}
	
	/**
	 * Confirms/declines the confirmation. Calls the "delete" prop function if the action has been confirmed
	 * @param {Boolean} status 
	 */
	confirmAction(status){
		this.hideConfirmationDialog();

		if(status){
			this.props.delete(this.props.article.id);
		}
	}
    	
	render() {
		return (
			<div className="article-actions">
				<div className="dropdown">
					<button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a className="dropdown-item" href="#">
							Edit
						</a>
						<div className="dropdown-item delete" onClick={this.showConfirmationDialog}>
							Delete
						</div>
					</div>
				</div>	

				{this.state.showConfirmationDialog && <ConfirmationDialog message="Are you sure you want to delete this article?" confirm={this.confirmAction}/>}
			</div>	
		);
	}
};

export default ArticleActions;