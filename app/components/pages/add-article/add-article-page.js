import React from "react";
import PropTypes from "prop-types";

import "./add-article-page.scss";

import Session from "../../../contexts/session";

import Forbidden from "../../common/forbidden/forbidden";
import ArticleHttpService from "../../../services/api/article";

class AddArticlePage extends React.Component {

    static propTypes = {
		sessionContext: PropTypes.shape({
			userSession: PropTypes.object
		})
	};

	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}
	
	render() {

        var sessionContext = this.props.sessionContext;
        var isAdmin = (sessionContext.userSession && sessionContext.userSession.type === "admin");

		return (
			<div id="add-article-page">

                {!isAdmin && <Forbidden/>}
                {isAdmin && <div>add article page</div>}

			</div>
		);
	}
};

export default Session.withConsumer(AddArticlePage);