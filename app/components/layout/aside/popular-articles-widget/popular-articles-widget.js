import React from "react";
import classNames from "classnames";

import "./popular-articles-widget.scss";

class PopularArticlesWidget extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			periods: [
				"today",
				"this week",
				"all time"
			],
			selectedPeriod: "today"
		};
		
		this.changePeriod = this.changePeriod.bind(this);
	}
	
	/**
	 * Changes the selected period and loads the new articles data
	 * @param {String} period
	 */
	changePeriod(period){
		this.setState({
			selectedPeriod: period
		});
	}

	render() {
		var self = this;
		
		var periods = this.state.periods.map(function (period, index){
			return (
				<button type="button" key={index} className={classNames("btn btn-light col-4", {"active": self.state.selectedPeriod === period})} 
						onClick={self.changePeriod.bind(null, period)}>
					{period}
				</button>
			);
		});
		
		return (
			<div className="popular-articles-widget">				
				<div className="btn-group btn-group-sm row no-gutters" role="group">
					{periods}
				</div>
				
				<div className="title">
					Popular articles
				</div>
			</div>
		);
	}
};

export default PopularArticlesWidget;