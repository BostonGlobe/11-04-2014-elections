/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = {

	defaultApiCallback: function() {
		var callback = this.props.raceNumbers.join('_');
		return callback;
	},

	defaultAllResultsAreIn: function(results) {

		var incompleteRaces = _.chain(results)
			.pluck('reporting_units')
			.flatten()
			.reject(function(v) {
				return v.precincts_reporting === v.total_precincts;
			})
			.value();

		return results.length && !incompleteRaces.length;
	},

	fetchResults: function() {

		var url = this.apiUrl();
		var apiCallbackFunc = this.apiCallback ?
			this.apiCallback() :
			this.defaultApiCallback();
		var apiCallback = '_' + apiCallbackFunc;

		window[apiCallback] = function(json) {

			var data = this.sortByDefault ?
				this.sortByDefault(json, this.props.raceNumbers) :
				json;

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

		var allResultsAreIn = this.allResultsAreIn ?
			this.allResultsAreIn(this.state.results) :
			this.defaultAllResultsAreIn(this.state.results);

		if (allResultsAreIn) {

			this.refs.thePollClock.stop();

		} else {

			// resume the pollclock
			this.refs.thePollClock.resume();

		}
	}
};

module.exports = FetchResultsMixin;