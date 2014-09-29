/**
 * @jsx React.DOM
 */

/**
 * MultipleSummaryResults
 * {1} PollClock
 *  +  SummaryResults
 *      ?  RaceName
 *      ?  SummaryTable
 *         {1} Header
 *          +  Row
 *         {1} Precincts
 *      ?  SummaryMap
 */

var React = require('react');
var SummaryResults = require('./SummaryResults/SummaryResults.jsx');

var MultipleSummaryResults = React.createClass({
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
	getInitialState: function() {
		return {races: []};
	},
	componentDidMount: function() {
		window['_' + this.props.raceNumbers.join('_')] = function(json) {
			this.setState({races:json});
		}.bind(this);
		this.fetchData();
	},
	render: function() {
		var multipleSummaryResults = this.state.races.map(function(race) {
			return (
				<SummaryResults race={race} key={race.race_number} />
			);
		});

		return (
			<div className='multiple-summary-results'>{multipleSummaryResults}</div>
		);
	}

});

module.exports = MultipleSummaryResults;