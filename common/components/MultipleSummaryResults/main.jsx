/**
 * @jsx React.DOM
 */

/**
 * MultipleSummaryResults
 * {1} PollClock
 *  +  SummaryResults
 *     {1} RaceName
 *      +  SummaryTable
 *         {1} Header
 *          +  Row
 *         {1} Precincts
 */

var React = require('react');

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
		return (
			<div className='multiple-summary-results'>multiple-summary-results</div>
		);
		// var multipleSummaryResults = this.state.races.map(function(race) {
		// 	return (
		// 		<SummaryResults race={race} />
		// 	);
		// });

		// return (
		// 	<div>{racesSummaryResults}</div>
		// );
	}

});

module.exports = MultipleSummaryResults;