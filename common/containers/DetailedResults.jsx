/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var Choropleth = require('../components/Choropleth.jsx');
var PollClock = require('../components/PollClock.jsx');
var REPORTING_UNITS = require('../../data/output/MA/REPORTING_UNITS.json');

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

	render: function() {
		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Choropleth results={this.state.results[0]} shapefile={REPORTING_UNITS} />
				<pre>{JSON.stringify(this.state.results, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = DetailedResults;