import React from "react";

import "./article-page.scss";

class ArticlePage extends React.Component {	
	render() {
		return (
			<div id="article-page">
				article page for article {this.props.match.params.id}
			</div>
		);
	}
};

export default ArticlePage;