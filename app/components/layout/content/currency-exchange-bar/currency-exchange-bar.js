import React from "react";

class CurrencyExchangeBar extends React.Component {
	render() {
		return (
			<div id="currency-exchange-bar">
				<iframe src="http://www.exchangerates.org.uk/widget/ER-LRTICKER.php?s=1&mc=EUR&mbg=F0F0F0&bs=yes&bc=000044&f=verdana&fs=10px&fc=000044&lc=000044&lhc=FE9A00&vc=FE9A00&vcu=008000&vcd=FF0000&" width="100%" height="30" frameBorder="0" scrolling="no" marginWidth="0" marginHeight="0"></iframe>
			</div>
		);
	}
};

export default CurrencyExchangeBar;