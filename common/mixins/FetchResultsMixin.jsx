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

		var base = 'http://www.bostonglobe.com/electionapi';

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

			data.forEach(function(race) {

				if (race.office_name === 'Governor' && race.state_postal === 'MA') {

					// first, zero out all winners
					race.reporting_units.forEach(function(reportingUnit) {
						reportingUnit.results.forEach(function(result) {
							result.winner = '';
						});
					});

					// next, only proceed if we have a winner
					if (window.governorWinner.governor.length) {

						var match = _.find(race.candidates, {last_name: window.governorWinner.governor});

						race.reporting_units.forEach(function(reportingUnit) {
							reportingUnit.results.forEach(function(result) {

								if (result.ap_candidate_id === match.id) {
									result.winner = 'X';
								}

							});
 						});

					}
				}

			});

			this.setState({results: data});

		}.bind(this);

		$.getJSON('http://www.boston.com/newsprojects/2014/elections-winner/winner.php?_cache=' + Date.now(), function(json) {

			window.governorWinner = json;
	
			$.ajax({
				url: url,
				dataType: 'jsonp',
				jsonpCallback: apiCallback
			});

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