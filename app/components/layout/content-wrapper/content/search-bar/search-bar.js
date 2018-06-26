import React from "react";
import PropTypes from "prop-types";

import {withRouter, matchPath} from "react-router-dom";

import "./search-bar.scss";

class SearchBar extends React.Component {
	
	constructor(props){
		super(props);
		
		this.sections = [
			"all news",
			"politics",
			"economy",
			"world",
			"technology",
			"sports"
		];
		
		//default values
		var selectedSection = this.sections[0];
		var searchTerm = "";
		
		//check if there are any search parameters in the URL and use them in the search bar
		var match = matchPath(window.location.pathname, {
			path: "/search/:section/:searchTerm?"
		});
		
		if(match){
			selectedSection = decodeURIComponent(match.params.section);
			searchTerm = decodeURIComponent(match.params.searchTerm || "");
		}
		
		this.state = {
			selectedSection: selectedSection,
			searchTerm: searchTerm
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.changeSection = this.changeSection.bind(this);
		this.search = this.search.bind(this);
	}
		
	/**
	 * Called when the input text changes
	 * @param {Object} e
	 */
	handleChange(e) {
		var text = e.target.value;
		
		this.setState({
			searchTerm: text
		});
	}
	
	/**
	 * Checks if the "Enter" key was pressed and calls the search function
	 * @param {Object} e
	 */
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.search();
		}
	}
	
	/**
	 * Sets the selected section
	 * @param {Object} e
	 */
	changeSection(e) {
		e.preventDefault();
		
		var section = $(e.target).attr("data-section");
		
		this.setState({
			selectedSection: section
		});
	}
	
	/**
	 * Redirects to the /search route passing the selected section and search terms
	 */
	search(){		
		this.props.history.push("/search/"+this.state.selectedSection+"/"+encodeURIComponent(this.state.searchTerm));
	}
	
	render() {
		var self = this;
		var placeholder = "Search";
		
		var options = this.sections.map(function (section){
			return (
				<a key={section} data-section={section} className="dropdown-item" onClick={self.changeSection}>{section}</a>
			);
		});
		
		return (
			<div className="search-bar">
	
				<div className="input-group">
				
					<input type="text" className="form-control" value={this.state.searchTerm} placeholder={placeholder} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
							
					<div className="input-group-append">
						<button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{this.state.selectedSection}
						</button>
						<div className="dropdown-menu">
							{options}
						</div>
					</div>
					
					<div className="input-group-append">
						<button className="btn btn-primary-light btn-search" onClick={this.search}>
							<img src="/img/search-icon-white.png"/>
						</button>
					</div>
				</div>

			</div>
		);
	}
};

export default withRouter(SearchBar);