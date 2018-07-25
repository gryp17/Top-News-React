import React from "react";
import PropTypes from "prop-types";

import "./article-comments.scss";

class ArticleComments extends React.Component {
	
	static propTypes = {
		comments: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
	}
		

	render() {
		var self = this;
			
		return (
			<div className="article-comments">
				<hr/>
				article commments go here
			</div>
		);
	};
};

export default ArticleComments;