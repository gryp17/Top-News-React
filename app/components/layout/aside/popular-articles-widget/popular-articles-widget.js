import React from "react";
import classNames from "classnames";

import "./popular-articles-widget.scss";

class PopularArticlesWidget extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			periods: [
				"all time",
				"this week",
				"today"
			],
			selectedPeriod: "all time"
		};
	}

	render() {
		var self = this;
		
		var periods = this.state.periods.map(function (period){
			return <button type="button" className={classNames("btn btn-light col-4", {"active": self.state.selectedPeriod === period})}>{period}</button>;
		});
		
		return (
			<div className="popular-articles-widget">				
				<div class="btn-group btn-group-sm row no-gutters" role="group">
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