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
// This will also determine whether we color the row squares or not, 'colorRows'

var React = require('react');
var SummaryResults = require('./SummaryResults/component.jsx');
var RaceName = require('./SummaryResults/RaceName.jsx');
var util = require('../../../common/js/util.js');
var FetchDataMixin = require('../mixins/FetchDataMixin.jsx');

var MultipleSummaryResults = React.createClass({
	mixins: [FetchDataMixin],
	render: function() {

		// races come in already ordered, based on data-racenumbers present in the HTML.
		// we should respect this order, which means the following:
		// if we have an order like 'Senate, Senate, Governor' we should not display
		// the second 'Senate' title.
		// if we have an order like 'Senate, Governor, Senate' we should display all
		// three titles, in order.
		// also, if we have several races with the same title,
		// order by party (this really only applies to Primaries)
		var races = this.state.races;
		var raceNumbers = _.pluck(races, 'race_number');
		
		var multipleSummaryResults = _.chain(races)
			.sortBy(util.sortRaceByType_delegate)
			.sortBy(function(race) {
				return _.indexOf(raceNumbers, race.office_name);
			})
			.map(function(race, index, races) {
				var thisName = RaceName.getName(race);

				// so: only display title if we're on the first race OR the previous race's title
				// doesn't match this one.
				var displayTitle = index === 0 ||
					RaceName.getName(race) !== RaceName.getName(races[index-1]);

				// for now, don't color primary rows (even if there's a map)
				var colorRows = race.race_type === 'General';

				return (
					<SummaryResults race={race} key={race.race_number} colorRows={colorRows} displayTitle={displayTitle} />
				);

			})
			.value();

		return (
			<div className='multiple-summary-results'>{multipleSummaryResults}</div>
		);
	}

});

module.exports = MultipleSummaryResults;