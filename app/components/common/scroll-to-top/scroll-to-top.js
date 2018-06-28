import React from "react";

import "./scroll-to-top.scss";

class ScrollToTop extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			visible: false
		};
		
		this.handleScroll = this.handleScroll.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
	}
	
	componentDidMount(){		
		$(window).on("scroll", this.handleScroll);
	}
	
	componentWillUnmount() {
		$(window).off("scroll");
	}
	
	/**
	 * Checks if the element should be visible depending on the scroll position and page height
	 */
	handleScroll() {
		var height = $(window).height();
		var top = $(window).scrollTop();

		this.setState({
			visible: top > height
		});
	}
	
	/**
	 * Makes the page scroll to the top
	 */
	scrollToTop(){
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	
	render() {		
		var content = null;
		
		if(this.state.visible){
			content = (
				<img className="scroll-to-top" title="Scroll to top" src="/img/scroll-to-top-icon.png" onClick={this.scrollToTop}/>
			);
		}
		
		return content;
	}
};

export default ScrollToTop;