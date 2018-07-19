import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

import Config from "../../../../config/config";

import "./articles-slider.scss";

class ArticlesSlider extends React.Component {
	
	static propTypes = {
		articles: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		
		this.articlesDir = Config.articlesDir;
		this.maxVisibleSlides = 3;
		
		this.sliderMargin = 0;
		
		this.getDimensions = this.getDimensions.bind(this);
		this.setSliderWidth = this.setSliderWidth.bind(this);
		this.handleWheelScroll = this.handleWheelScroll.bind(this);
		this.slideLeft = this.slideLeft.bind(this);
		this.slideRight = this.slideRight.bind(this);
		this.slide = this.slide.bind(this);
	}
	
	componentDidMount(){
		$(window).on("resize", this.setSliderWidth);
		$(this.refs.wrapper).on("mousewheel DOMMouseScroll", this.handleWheelScroll);
		
		this.setSliderWidth();
	}
	
	componentWillUnmount(){
		$(window).off("resize", this.setSliderWidth);
		$(this.refs.wrapper).off("mousewheel DOMMouseScroll", this.handleWheelScroll);
	}
		
	/**
	 * Returns the most needed component dimmensions (wrapper, slider and slide width)
	 */
	getDimensions(){
		return {
			wrapperWidth: $(this.refs.wrapper).width(),
			sliderWidth: $(this.refs.slider).width(),
			slideWidth: $(this.refs.wrapper).width() / this.maxVisibleSlides //3 visible articles at all times
		};
	}
	
	/**
	 * Sets the slider width based on the articles count.
	 * Also resets the slider position in order to avoid weird behaviour.
	 */
	setSliderWidth(){
		var dimensions = this.getDimensions();
		$(this.refs.slider).width(this.props.articles.length * dimensions.slideWidth);

		//reset the slider position
		this.slide(0);
	}
	
	/**
	 * Listens for the mouse wheel event and slides the slider left or right
	 * @param {Object} e
	 */
	handleWheelScroll(e){
		e.preventDefault();
		
		if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
			this.slideLeft();
		} else {
			this.slideRight();
		}
	}
	
	/**
	 * Makes the slider slide left
	 */
	slideLeft(){
		var dimensions = this.getDimensions();
		var maxMargin = 0;
		
		var newMargin = this.sliderMargin + dimensions.slideWidth;
		
		if(newMargin > maxMargin){
			return;
		}
		
		this.slide(newMargin);
	}
	
	/**
	 * Makes the slider slide right
	 */
	slideRight(){
		var dimensions = this.getDimensions();
		var minMargin = (dimensions.sliderWidth - dimensions.wrapperWidth + 10) * -1;
		
		var newMargin = this.sliderMargin - dimensions.slideWidth;

		if(newMargin < minMargin){
			return;
		}
		
		this.slide(newMargin);
	}
	
	/**
	 * Makes the slider slide to the given margin
	 * @param {Number} margin
	 */
	slide(margin){
		this.sliderMargin = margin;
		
		$(this.refs.slider).stop().animate({marginLeft: this.sliderMargin}, 500);
	}
	
	render() {
		var self = this;
			
		var articles = this.props.articles.map(function (article){
			return (
				<div className="slide col" key={article.id}>
					<Link to={"/article/"+article.id} title={article.title}>
						<img className="img-fluid image" src={self.articlesDir + article.image}/>
						<div className="title">
							{article.title}
						</div>
					</Link>
				</div>
			);
		});
		
		return (
			<div className="articles-slider" ref="wrapper">
				{articles.length > this.maxVisibleSlides  && <img className="arrow left" src="/img/icons/arrow-icon.png" onClick={this.slideLeft}/>}
				
				<div className="slider row" ref="slider">
					{articles}
				</div>
				
				{articles.length > this.maxVisibleSlides && <img className="arrow right" src="/img/icons/arrow-icon.png" onClick={this.slideRight}/>}
			</div>
		);
	};
};

export default ArticlesSlider;