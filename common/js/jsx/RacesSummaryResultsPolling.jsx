/**
 * @jsx React.DOM
 */

var React = require('react');
var RaceSummaryResults = require('./RaceSummaryResults.jsx');

var RacesSummaryResultsPolling = React.createClass({
	fetchData: function() {
		var url = 'http://www.bostonglobe.com/electionapi/races/number?' + this.props.raceNumbers.map(function(value) {
			return 'number=' + value;
		}).join('&');

		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: '_' + this.props.raceNumbers.join('_')
		});
	},
	// getInitialState: function() {
	// 	return {races: []};
	// },
	componentDidMount: function() {
		// window['_' + this.props.raceNumbers.join('_')] = function(json) {
		// 	this.setState({races:json});
		// }.bind(this);
		// this.fetchData();
	},
	render: function() {

		debugger;

		var racesSummaryResults = this.state.races.map(function(race) {
			return (
				<RaceSummaryResults race={race} />
			);
		});

		return (
			<div>{racesSummaryResults}</div>
		);
	}
});

module.exports = RacesSummaryResultsPolling;