import React from "react";

var Context = React.createContext();

/**
 * Higher order function that allows the wrapped component to use the sessionContext prop
 * @param {Object} WrappedComponent
 * @returns {Object}
 */
function withConsumer(WrappedComponent){
	return class extends React.Component {
		render(){
			return (
				<Context.Consumer>
					{(session) => (
						<WrappedComponent {...this.props} sessionContext={session}/>
					)}
				</Context.Consumer>
			);
		}
	};
}

export default {
	Context,
	withConsumer
};