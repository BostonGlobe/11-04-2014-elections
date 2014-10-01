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
			.map(function(race, index, races) {

				// races shouldn't always display titles.
				// e.g., say we have three races: Governor (Dem), Governor (GOP), Lieutenant Governor
				// we should only title the first and third races
				// so, if this race's title is the same as last race's title, don't display it
				// this makes the assumption that a race's title is its defining factor
				// maybe that isn't the case! maybe <RaceName> should be in charge of 
				// creating a custom race title.
				// if that's the case, then we might have to revisit this and perhaps place this logic elsewhere.

				// so: only display title if we're on the first race OR the previous race's title
				// doesn't match this one.
				var displayTitle = index === 0 || races[index-1].office_name !== race.office_name;

				return (
					<SummaryResults race={race} key={race.race_number} hasGraphic={false} displayTitle={displayTitle} />
				);
			});

		return (
			<div className='multiple-summary-results'>{multipleSummaryResults}</div>
		);
	}

});

module.exports = MultipleSummaryResults;









