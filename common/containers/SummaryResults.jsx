/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Summary           = require('../components/Summary.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Title             = require('../components/Title.jsx');
var util              = require('../assets/js/util.js');

var SummaryResults = React.createClass({

	mixins: [FetchResultsMixin],

	allResultsAreIn: function(results) {
		return false;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var params = [];
		this.props.raceNumbers.forEach(function(value) {
			params.push({
				key: 'number',
				value: value
			});
		});
		params.push({key: 'date', value: this.props.date});
		params.push({key: 'state', value: this.props.state});

		var queryparams = params.map(function(value) {
			return [value.key, value.value].join('=');
		}).join('&');

		return '/races/number?' + queryparams;
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

		var summaries = _.chain(this.state.results)
			.map(function(result) {
				var name = util.raceTitle(result);

				return <div className='summary-result'>
					<Title name={name} />
					<Summary results={result} key={result.race_number} />
				</div>;
			})
			.value();

		return (
			<div className='summary-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{summaries}
			</div>
		);
	}

});

module.exports = SummaryResults;