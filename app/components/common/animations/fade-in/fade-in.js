import React from "react";
import {CSSTransition} from "react-transition-group";

import "./fade-in.scss";

var FadeIn = function (props) {
	return (
		<CSSTransition in appear={true} timeout={300} classNames="fade-in">
			{props.children}
		</CSSTransition>
	);
};

export default FadeIn;