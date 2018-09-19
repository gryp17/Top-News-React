import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, NavLink} from "react-router-dom";

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
						<Route exact path="/" component={HomePage}/>
						<Route exact path="/search/:section/:searchTerm?" component={SearchPage}/>
						<Route exact path="/article/:id" component={ArticlePage}/>
						<Route exact path="/user/:id" component={UserPage}/>
					</Switch>
				</div>
				
			</div>
		);
	}
};

export default Content;