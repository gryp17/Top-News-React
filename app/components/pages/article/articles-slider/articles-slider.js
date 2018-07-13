import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import "./articles-slider.scss";

class ArticlesSlider extends React.Component {
	
	static propTypes = {
		articles: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="articles-slider">
				slider goes here
				{this.props.articles.length}
			</div>
		);
	};
};

export default ArticlesSlider;