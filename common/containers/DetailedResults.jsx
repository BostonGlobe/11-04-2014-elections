/**
 * @jsx React.DOM
 */

var React             = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Choropleth        = require('../components/Choropleth.jsx');
var PollClock         = require('../components/PollClock.jsx');
var RaceName          = require('../components/RaceName.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');

var Tooltip           = require('../components/Tooltip.jsx');

var REPORTING_UNITS   = require('../../data/output/MA/REPORTING_UNITS.json');

var util              = require('../assets/js/util.js');

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

	tooltipCallback: function(d) {

		// each tooltip needs: the reporting unit, and the candidate info
		// find the reporting unit
		var results = this.state.results[0];
		this.setState({selectedReportingUnit: d.properties.reporting_unit});
	},

	getInitialState: function() {
		return {selectedReportingUnit: null};
	},

	render: function() {

		var results = this.state.results[0];

		var tooltip = null;

		if (!Modernizr.touch && results) {
			tooltip = <Tooltip reportingUnit={this.state.selectedReportingUnit} candidates={results.candidates} />;
		}

		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<RaceName race={results} />
				<ShareTools />
				<Summary results={results} />
				<div className='choropleth-container'>
					<Choropleth results={results} shapefile={REPORTING_UNITS} tooltipCallback={this.tooltipCallback} />
					{tooltip}
				</div>
			</div>
		);
	}

});

module.exports = DetailedResults;