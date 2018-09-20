import React from "react";
import PropTypes from "prop-types";

import "./user-details.scss";

var UserDetails = function (props) {
	return (
		<div className="user-details">
			<h4>
				User Profile For <strong>{props.user.username}</strong>
			</h4>
			
			<hr/>
			
			<div>
				Avatar: {props.user.avatar}
			</div>
			
			<div>
				Account type: {props.user.type}
			</div>
			
			<div>
				Active: {props.user.active}
			</div>
			
			<div>
				Registered: {props.user.registered}
			</div>
			
			{(props.currentUser && props.currentUser.id === props.user.id) && <button className="btn btn-success">Edit</button>}
			
		</div>
	);
};

UserDetails.propTypes = {
	user: PropTypes.object.isRequired,
	currentUser: PropTypes.object
};

export default UserDetails;