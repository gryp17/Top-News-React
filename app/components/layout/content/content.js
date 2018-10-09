import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, withRouter} from "react-router-dom";

import "./content.scss";

import CurrencyExchangeBar from "./currency-exchange-bar/currency-exchange-bar";
import SearchBar from "./search-bar/search-bar";

import HomePage from "../../pages/home/home-page";
import ArticlePage from "../../pages/article/article-page";
import UserPage from "../../pages/user/user-page";
import SearchPage from "../../pages/search/search-page";

class Content extends React.Component {	
	render() {		
		return (
			<div id="content">
				
				<CurrencyExchangeBar/>
								
				<SearchBar/>
				
				<div className="page-wrapper">
					<Switch>
						{/* 
							Explicitly set the "key" attribute in order to force the component to be reloaded when the route changes.
							Use the "withRouter" HOC in order to have access to the location object
						*/}
						<Route exact path="/" component={HomePage}/>
						<Route exact path="/search/:section/:searchTerm?" component={SearchPage} key={location.pathname}/>
						<Route exact path="/article/:id" component={ArticlePage} key={location.pathname}/>
						<Route exact path="/user/:id" component={UserPage} key={location.pathname}/>
					</Switch>
				</div>
				
			</div>
		);
	}
};

export default withRouter(Content);