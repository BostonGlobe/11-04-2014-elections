/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = {
	fetchResults: function() {

		var url = this.apiUrl();
		var apiCallback = '_' + this.apiCallback();

		window[apiCallback] = function(json) {

			var data = this.sortByDefault(json, this.props.choices);
			this.setState({results: data});

		}.bind(this);

		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: apiCallback
		});
	},

	getInitialState: function() {
		return {results: []};
	},

	// this runs after render, which is when we check if all results are in
	componentDidUpdate: function() {

		if (this.allResultsAreIn(this.state.results)) {

			this.refs.thePollClock.stop();

		} else {

			// resume the pollclock
			this.refs.thePollClock.resume();

		}
	}
};

module.exports = FetchResultsMixin;