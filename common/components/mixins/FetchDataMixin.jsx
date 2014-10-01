/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchDataMixin = {
	fetchData: function(isDev) {
		var url = 'http://' + (isDev ? 'localhost:8080' : 'www.bostonglobe.com') + '/electionapi/races/number?' + this.props.raceNumbers.map(function(value) {
			return 'number=' + value;
		}).join('&');

		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: '_' + this.props.raceNumbers.join('_')
		});
	},
	componentDidMount: function() {
		window['_' + this.props.raceNumbers.join('_')] = function(json) {

			// the races array (json) doesn't necessarily come back from the server
			// in the order in which it was requested
			// let's fix that right here.

			var raceNumbers = this.props.raceNumbers;

			var races = _.sortBy(json, function(race) {
				return _.indexOf(raceNumbers, race.race_number);
			});

			this.setState({races:races});

		}.bind(this);

		this.fetchData(true);
	},
	getInitialState: function() {
		return {races: []};
	}
};

module.exports = FetchDataMixin;