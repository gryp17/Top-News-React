import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import "./user-details.scss";

import EditProfile from "./edit-profile/edit-profile";

import Config from "../../../../config/config";

var UserDetails = function (props) {
	
	var user = props.user;
	var avatarsDir = Config.avatarsDir;
	var registered = moment(user.registered);
	
	return (
		<div className="user-details">
			<h4>
				<strong>{props.user.username}</strong>
				{(props.currentUser && props.currentUser.id === user.id) && <EditProfile {...props}/>}
			</h4>

			<hr/>
			
			<div className="row no-gutters">
				<div className="col-md-5 details-avatar-wrapper">
					<img src={avatarsDir+user.avatar}/>
				</div>
				<div className="col-md-7 info-wrapper">
					<div className="item">
						<strong>Username:</strong> {user.username}
					</div>
					<div className="item">
						<strong>Account Type:</strong> {user.type}
					</div>
					<div className="item">
						<strong>Registered:</strong> <span title={registered.format("YYYY-MM-DD hh:mm:ss")}>{registered.from(moment())}</span>
					</div>
				</div>
			</div>
			
		</div>
	);
};

UserDetails.propTypes = {
	updateUserDetails: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	currentUser: PropTypes.object
};

export default UserDetails;