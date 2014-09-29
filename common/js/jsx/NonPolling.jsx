/**
 * @jsx React.DOM
 */

var React = require('react');
var RaceSummaryResults = require('./RaceSummaryResults.jsx');

var RacesSummaryResultsPolling = React.createClass({
	componentDidMount: function() {
		window['_' + this.props.raceNumbers.join('_')] = function(json) {
			this.setState({races:json});
		}.bind(this);
		this.fetchData();
	},
	render: function() {

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