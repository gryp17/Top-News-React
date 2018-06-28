import React from "react";
import {CSSTransition} from "react-transition-group";

import "./fade-in.scss";

class FadeIn extends React.Component {
	render() {
		return (
			<CSSTransition in appear={true} timeout={300} classNames="fade-in">
				{this.props.children}
			</CSSTransition>
		);
	}
};

export default FadeIn;