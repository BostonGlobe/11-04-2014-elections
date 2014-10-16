/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock = require('../PollClock.jsx');

var SummaryResults = require('./SummaryResults/component.jsx');
var RaceName = require('./SummaryResults/RaceName.jsx');
var util = require('../../../common/js/util.js');

var MultipleSummaryResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080' : 'devweb.bostonglobe.com') + '/electionapi/races/number?' + this.props.choices.map(function(value) {
			return 'number=' + value;
		}).join('&');
		return url;
	},

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = this.props.choices.join('_');
		return callback;
	},

	// FetchResultsMixin needs this
	allResultsAreIn: function(results) {

		var incompleteRaces = _.chain(results)
			.pluck('reporting_units')
			.flatten()
			.reject(function(v) {
				return v.precincts_reporting === v.total_precincts;
			})
			.value();

		return results.length && !incompleteRaces.length;
	},

	// FetchResultsMixin needs this
	sortByDefault: function(results, ordering) {

		var sortedRaces = _.chain(results)
			.sortBy(function(race) {
				// the races array doesn't necessarily come back from the server
				// in the order in which it was requested.
				// ordering is the data-racenumbers attribute.
				// we should respect this when ordering races.
				return _.indexOf(ordering, race.race_number);
			})
			.value();

		return sortedRaces;
	},

	render: function() {
		
		var multipleSummaryResults = _.map(this.state.results, function(race, index, races) {

			var thisName = RaceName.format(race);

			// only display title if we're on the first race OR the previous race's title
			// doesn't match this one.
			var displayTitle = index === 0 ||
				RaceName.format(race) !== RaceName.format(races[index-1]);

			// for now, don't color primary rows (even if there's a map)
			var colorRows = race.race_type === 'General';

			return (
				<SummaryResults race={race} key={race.race_number} colorRows={colorRows} displayTitle={displayTitle} />
			);

		});

		return (
			<div className='multiple-summary-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{multipleSummaryResults}
			</div>
		);
	}
});

module.exports = MultipleSummaryResults;