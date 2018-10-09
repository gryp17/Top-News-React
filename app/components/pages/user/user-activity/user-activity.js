import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import "./user-activity.scss";

import Utils from "../../../../services/utils";
import Pagination from "../../../common/pagination/pagination";

var UserActivity = function (props) {
    	
	var comments = props.data.map((comment) => {
		return (
			<div className="user-comment" key={comment.id}>
                <div className="date">
                    {moment(comment.date).format("MMMM D, YYYY [at] HH:mm")}
                </div>

                Commented:

                <div className="content">
                    {comment.content}
                </div> 

                on 
                
                <Link to={"/article/"+comment.articleId} className="title">
                    {Utils.limitTo(comment.articleTitle, 50)}
                </Link>
			</div>
		);
    });
	
	return (
		<div className="user-activity">
            {props.total === 0 && 
				<div className="no-comments">
					The user hasn't written any comments yet.
				</div>
			}

			{comments}
						
			{props.total > 0 && <Pagination {...props}/>}
		</div>
	);
};

UserActivity.propTypes = {
	data: PropTypes.array.isRequired,
	perPage: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	goToPage: PropTypes.func.isRequired
};

export default UserActivity;