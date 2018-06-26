import React from "react";

import "./content-wrapper.scss";

import Content from "./content/content";
import Aside from "./aside/aside";

class ContentWrapper extends React.Component {
	render() {
		return (
			<div id="content-wrapper">
				<div className="row no-gutters">
					<div className="col-md-4 order-md-8 col-sm-push-8">
						<Aside/>
					</div>
					<div className="col-md-8 order-md-4 col-sm-pull-4">
						<Content/>
					</div>
				</div>
			</div>
		);
	}
}
;

export default ContentWrapper;