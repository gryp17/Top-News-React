import React from "react";

import {withRouter, matchPath} from "react-router-dom";

import "./search-bar.scss";

import ArticleHttpService from "../../../../services/api/article";

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

		this.defaultState = {
			selectedSection: this.sections[0],
			searchTerm: "",
			autocompleteSuggestions: []
		};

		this.state = this.defaultState;
		this.autocompleteTimeout = null;

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.changeSection = this.changeSection.bind(this);
		this.search = this.search.bind(this);
		this.autocomplete = this.autocomplete.bind(this);
		this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(this);
		this.hideAutocompleteSuggestions = this.hideAutocompleteSuggestions.bind(this);
	}

	componentDidMount(){
		var self = this;

		//get the initial search params when the component first loads
		this.getSearchParamsFromURL(window.location.pathname);

		//listen for location changes and update/reset the search params
		this.props.history.listen(function (location, action){
			self.getSearchParamsFromURL(location.pathname);
		});
		
		$(window).click(this.hideAutocompleteSuggestions);
	}
	
	componentWillUnmount(){
		$(window).off("click", this.hideAutocompleteSuggestions);
	}

	/**
	* Check if there are any search parameters in the URL and use them in the search bar
	* Otherwise reset the search bar to it's default values
	* @param {String} url
	*/
	getSearchParamsFromURL(url){

		var match = matchPath(url, {
			path: "/search/:section/:searchTerm?"
		});

		if(match){
			this.setState({
				selectedSection: decodeURIComponent(match.params.section),
				searchTerm: decodeURIComponent(match.params.searchTerm || ""),
				autocompleteSuggestions: []
			});
		}else{
			this.setState(this.defaultState);
		}
	}

	/**
	 * Called when the input text changes
	 * @param {Object} e
	 */
	handleChange(e) {
		var text = e.target.value;

		//update the search term state and call the autocomplete function
		this.setState({
			searchTerm: text
		}, this.autocomplete);
	}

	/**
	 * Checks if the "Enter" key was pressed and calls the search function
	 * @param {Object} e
	 */
	handleKeyDown(e) {
		if (e.key === "Enter") {
			this.search();
		}
		
		//TODO: make the first autocomplete item selected (if there are any)
		if (e.key === "ArrowDown"){
			console.log("down");
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
		
	/**
	 * Shows/updates the autocomplete suggestions based on the user search
	 */
	autocomplete(){
		var self = this;
		
		clearTimeout(this.autocompleteTimeout);
		
		if(!this.state.searchTerm || this.state.searchTerm.length < 3){
			this.setState({
				autocompleteSuggestions: []
			});
			
			return;
		}
		
		this.autocompleteTimeout = setTimeout(function (){
			ArticleHttpService.getAutocompleteSuggestions(self.state.selectedSection, self.state.searchTerm, 5).then(function (response){
				self.setState({
					autocompleteSuggestions: response.data
				});
			});
		}, 500);
		
	}
	
	/**
	 * Sets the search term and resets the autocompleteSuggestions in order to hide the list
	 * @param {String} text
	 */
	selectAutocompleteSuggestion(text){
		this.setState({
			searchTerm: text,
			autocompleteSuggestions: []
		});
	}
	
	/**
	 * Hides the autocomplete suggestions if the user has clicked anywhere outside of the search bar
	 * @param {Object} e
	 */
	hideAutocompleteSuggestions(e){
		if (!$(e.target).is(".search-bar, .search-bar *")) {
			this.setState({
				autocompleteSuggestions: []
			});
		}
	}

	render() {
		var self = this;
		var placeholder = "Search";

		var options = this.sections.map(function (section){
			return (
				<a key={section} data-section={section} className="dropdown-item" onClick={self.changeSection}>{section}</a>
			);
		});
		
		var autocompleteOptions = this.state.autocompleteSuggestions.map(function (suggestion, index){
			return (
				<div className="item" key={index} onClick={self.selectAutocompleteSuggestion.bind(null, suggestion)}>{suggestion}</div>
			);
		});

		return (
			<div className="search-bar">

				<div className="input-group">

					<div className="input-wrapper">
						<input type="text" className="form-control" value={this.state.searchTerm} placeholder={placeholder} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
						{autocompleteOptions.length > 0 && <div className="autocomplete-results">{autocompleteOptions}</div>}
					</div>
					
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
							<img src="/img/icons/search-icon-white.png"/>
						</button>
					</div>
				</div>

			</div>
		);
	}
};

export default withRouter(SearchBar);