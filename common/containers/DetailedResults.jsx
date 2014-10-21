/**
 * @jsx React.DOM
 */

				// <Choropleth results={results} shapefile={REPORTING_UNITS} />

var React             = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Choropleth        = require('../components/Choropleth.jsx');
var PollClock         = require('../components/PollClock.jsx');
var RaceName          = require('../components/RaceName.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');

var REPORTING_UNITS   = require('../../data/output/MA/REPORTING_UNITS.json');

var util = require('../assets/js/util.js');

var DetailedResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/number?detail=true&' +
			this.props.raceNumbers.map(function(value) {
				return 'number=' + value;
			}).join('&') + '&state=' + this.props.state;
		util.log(url);
		return url;
	},

	// allResultsAreIn: function() {
	// 	return false;
	// },

	render: function() {

		var results = this.state.results[0];

		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<RaceName race={results} />
				<ShareTools />
				<Summary results={results} />
			</div>
		);
	}

});

module.exports = DetailedResults;