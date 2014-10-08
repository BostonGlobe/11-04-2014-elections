/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock = require('../PollClock.jsx');

var DetailedResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080' : 'devweb.bostonglobe.com') + '/electionapi/races/number?detail=true&' + this.props.choices.map(function(value) {
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
		return results;
	},

	render: function() {
		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<pre>{JSON.stringify(this.state.results, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = DetailedResults;