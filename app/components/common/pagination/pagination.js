import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./pagination.scss";

var Pagination = function (props) {	

	var pages = [];
		
	var start = 0;
	var end = 0;

	if(props.currentPage === 0){
		start = props.currentPage;
		end = Math.min(props.currentPage + 2, props.totalPages - 1);
	}else if (props.currentPage === props.totalPages - 1){
		start = Math.max(props.currentPage - 2, 0);
		end = props.currentPage;
	}else{
		start = props.currentPage - 1;
		end = props.currentPage + 1;
	}
	
	for(var i = start; i <= end; i++){
		 pages.push(
			 (
				<button className={classNames("btn btn-secondary", {"active": props.currentPage === i})} key={i} onClick={props.goToPage.bind(null, i)}>
					{i + 1}
				</button>
			 )
		 );
	}
   
	return (
		<div className="pagination">
			<button className="btn btn-secondary" disabled={props.currentPage === 0} 
					onClick={props.goToPage.bind(null, 0)} title="First Page">
				&lt;&lt;
			</button>

			<button className="btn btn-secondary" disabled={props.currentPage === 0} 
					onClick={props.goToPage.bind(null, props.currentPage - 1)} title="Previous Page">
				&lt;
			</button>

			{pages}

			<button className="btn btn-secondary" disabled={props.currentPage === props.totalPages - 1} 
					onClick={props.goToPage.bind(null, props.currentPage + 1)} title="Next Page">
				&gt;
			</button>

			<button className="btn btn-secondary" disabled={props.currentPage === props.totalPages - 1} 
					onClick={props.goToPage.bind(null, props.totalPages - 1)} title="Last Page">
				&gt;&gt;
			</button>
		</div>
	);
};

Pagination.propTypes = {
	perPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	goToPage: PropTypes.func.isRequired
};

export default Pagination;