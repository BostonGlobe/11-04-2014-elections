/**
 * @jsx React.DOM
 */

var React             = require('react');
var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var Choropleth        = require('../components/Choropleth.jsx');
var PollClock         = require('../components/PollClock.jsx');
var RaceName          = require('../components/RaceName.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var REPORTING_UNITS   = require('../../data/output/MA/REPORTING_UNITS.json');

var DetailedResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'devweb.' : 'www.') + 'bostonglobe.com/electionapi/races/number?detail=true&' + this.props.choices.map(function(value) {
			return 'number=' + value;
		}).join('&');
		return url;
	},

	allResultsAreIn: function() {
		return false;
	},

	render: function() {

		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<RaceName race={this.state.results[0]} />
				<ShareTools />
				<Choropleth results={this.state.results[0]} shapefile={REPORTING_UNITS} />
				<pre>{JSON.stringify(this.state.results, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = DetailedResults;