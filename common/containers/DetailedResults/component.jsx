/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var Choropleth = require('../Choropleth/component.jsx');
var PollClock = require('../PollClock.jsx');
var towns = require('../../../data/output/towns.json');

var DetailedResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = true;
		var url = 'http://' + (isDev ? 'devweb.' : 'www.') + 'bostonglobe.com/electionapi/races/number?detail=true&' + this.props.choices.map(function(value) {
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

	render: function() {
		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Choropleth results={this.state.results[0]} shapefile={towns} />
				<pre>{JSON.stringify(this.state.results, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = DetailedResults;