import React from "react";

class WeatherWidget extends React.Component {
		
	showWeather(){
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
	}
	
	render() {
		return (
			<div className="weather-widget">
				<a className="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="clear">
					NEW YORK WEATHER
				</a>
				
				{this.showWeather()}
			</div>
		);
	}
};

export default WeatherWidget;