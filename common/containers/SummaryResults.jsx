/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Summary           = require('../components/Summary.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Title             = require('../components/Title.jsx');
var FullResultsButton = require('../components/FullResultsButton.jsx');
var util              = require('../assets/js/util.js');
var Moment            = require('moment');

var SummaryResults = React.createClass({

	mixins: [FetchResultsMixin],

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

		var self = this;

		var summaries = _.chain(this.state.results)
			.map(function(result) {
				var name = util.raceTitle(result);

				var moment = Moment(result.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				var isUncontested = result.candidates.length < 2;

				var url = '/news/politics/election-results/' + displayDate + '/race/' + result.state_postal + '/' + result.alternate_office_name + '/' + result.seat_name;

				var button = !isUncontested && self.props.state ? <FullResultsButton url={url} /> : null;

				return <div className='summary-result' key={result.race_number}>
					<Title name={name} />
					<Summary results={result} />
					{button}
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