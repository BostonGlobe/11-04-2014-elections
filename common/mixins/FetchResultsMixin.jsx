/**
 * @jsx React.DOM
 */

var React = require('react');
var util  = require('../assets/js/util.js');

var FetchResultsMixin = {

	defaultApiCallback: function() {
		var propsStringified = _.chain(this.props)
			.sortBy(function(v, i) {
				return i;
			})
			.values()
			.flatten()
			.value()
			.join('');

		var callback = [
			this.constructor.displayName,
			propsStringified
		].join('');

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

		var base = 'http://devweb.bostonglobe.com/electionapi';

		var url = [base, this.apiUrl()].join('');
		var apiCallbackFunc = this.apiCallback ?
			this.apiCallback() :
			this.defaultApiCallback();
		var apiCallback = '_' + apiCallbackFunc.replace(/\W/g, '');

		window[apiCallback] = function(json) {

			var processedJson = this.processJson ?
				this.processJson(json) :
				json;

			var data = this.sortByDefault ?
				this.sortByDefault(processedJson, this.props.raceNumbers) :
				processedJson;

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