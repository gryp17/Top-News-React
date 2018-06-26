import React from "react";

import "./loading-indicator.scss";

class LoadingIndicator extends React.Component {
	render() {
		return (
			<div className="loading-indicator">
				<img src="/img/loading.gif"/>
			</div>
		);
	}
};

export default LoadingIndicator;