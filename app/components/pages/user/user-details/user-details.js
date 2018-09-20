import React from "react";
import PropTypes from "prop-types";

import "./user-details.scss";

import Config from "../../../../config/config";

var UserDetails = function (props) {
	
	var user = props.user;
	var avatarsDir = Config.avatarsDir;
	
	return (
		<div className="user-details">
			<h4>
				User Profile For <strong>{props.user.username}</strong>
			</h4>
			
			<hr/>
			
			<div className="row no-gutters">
				<div className="col-md-3">
					<img src={avatarsDir+user.avatar}/>
				</div>
				<div className="col-md-9">
					<div>
						Username: {user.username}
					</div>

					<div>
						Account type: {user.type}
					</div>

					<div>
						Active: {user.active}
					</div>

					<div>
						Registered: {user.registered}
					</div>
				</div>
			</div>
			
			{(props.currentUser && props.currentUser.id === user.id) && <button className="btn btn-success">Edit</button>}
			
		</div>
	);
};

UserDetails.propTypes = {
	user: PropTypes.object.isRequired,
	currentUser: PropTypes.object
};

export default UserDetails;