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

// Not implemented yet: we should probably add a "data-mapnumbers" attribute
// that will toggle a map (or not) for the corresponding race.
// This will also determine whether we color the row squares or not, 'hasGraphic'

var React = require('react');
var SummaryResults = require('./SummaryResults/component.jsx');
var util = require('../../../common/js/util.js');

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

		// how do order races?
		// let's look at the data-racenumbers attribute. e.g. data-racenumbers='22796,22004,22003'
		// translate numbers to names: 'Governor, Lieutenant Governor, Governor'
		// we should translate that to the following order: 'Governor, Lieutenant Governor'
		// we'll assume lodash's uniq() does the job. it not, we'll revisit.
		// also, order by party, like so: 'democratic, republican, independent'
		var orderedRaceNames = _.chain(this.state.races)
			.pluck('office_name')
			.uniq()
			.value();

		var multipleSummaryResults = _.chain(this.state.races)
			.sortBy(util.sortRaceByPartyDelegate)
			.sortBy(function(race) {
				return _.indexOf(orderedRaceNames, race.office_name);
			})
			.map(function(race) {
				return (
					<SummaryResults race={race} key={race.race_number} hasGraphic={false} />
				);
			});

		return (
			<div className='multiple-summary-results'>{multipleSummaryResults}</div>
		);
	}

});

module.exports = MultipleSummaryResults;









