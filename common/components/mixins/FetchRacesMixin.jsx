/**
 * @jsx React.DOM
 */

// this assumes the existence of a dom element
// with data-racenumbers attribute

// this also assumes the existence of this.refs.thePollClock

// we need to change things up. for example, the BalanceOfPowerResults component
// won't be using the /electionapi/races/number method.

var React = require('react');

var FetchRacesMixin = {
	sortByDefault: function(races, orderedRaceNumbers) {

		var sortedRaces = _.chain(races)
			.sortBy(function(race) {
				// the races array (json) doesn't necessarily come back from the server
				// in the order in which it was requested.
				// orderedRaceNumbers is the data-racenumbers attribute.
				// we should respect this when ordering races.
				return _.indexOf(orderedRaceNumbers, race.race_number);
			})
			.value();

		return sortedRaces;
	},

	racesAreOver: function(races) {

		var incompleteRaces = _.chain(races)
			.pluck('reporting_units')
			.flatten()
			.reject(function(v) {
				return v.precincts_reporting === v.total_precincts;
			})
			.value();

		return races.length && !incompleteRaces.length;
	},

	fetchRaces: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080' : 'devweb.bostonglobe.com') + '/electionapi/races/number?' + this.props.raceNumbers.map(function(value) {
			return 'number=' + value;
		}).join('&');

		window['_' + this.props.raceNumbers.join('_')] = function(json) {

			var sortedRaces = this.sortByDefault(json, this.props.raceNumbers);
			this.setState({races:sortedRaces});

		}.bind(this);

		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: '_' + this.props.raceNumbers.join('_')
		});
	},
	getInitialState: function() {
		return {races: []};
	},

	// this runs after render, which is when we check if the races are over
	componentDidUpdate: function() {

		if (this.racesAreOver(this.state.races)) {

			this.refs.thePollClock.stop();

		} else {

			// resume the pollclock
			this.refs.thePollClock.resume();

		}

	}
};

module.exports = FetchRacesMixin;