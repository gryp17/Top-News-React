import React from "react";
import PropTypes from "prop-types";

import "./pagination.scss";

var Pagination = function (props) {
	return (
		<div className="pagination">
			pagination component
		</div>
	);
};

Pagination.propTypes = {
	articles: PropTypes.array
};

export default Pagination;