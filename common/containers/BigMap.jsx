/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Choropleth        = require('../components/Choropleth.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Title             = require('../components/Title.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Tooltip           = require('../components/Tooltip.jsx');

var REPORTING_UNITS   = require('../../data/assets/MA/REPORTING_UNITS.json');

var util              = require('../assets/js/util.js');

var BigMap = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/' + this.props.state + '/' + this.props.office + '/' + this.props.seat + '?detail=true&date=' + this.props.date;
		return url;
	},

	tooltipCallback: function(opts) {
		this.refs.theTooltip.setState(opts);
	},

	allResultsAreIn: function(results) {
		return false;
	},

	render: function() {

		var results = this.state.results[0];

		var tooltip = null;

		if (!Modernizr.touch && results) {
			tooltip = <Tooltip
				ref='theTooltip'
				candidates={results.candidates}
				isBallot={results.race_type === 'Ballot Issue'}
			/>;
		}

		var choropleth = this.props.state.toUpperCase() === 'MA' ? <div className='choropleth-container'>
			<Choropleth
				results={results}
				shapefile={REPORTING_UNITS}
				tooltipCallback={this.tooltipCallback}
			/>
			{tooltip}
		</div> : null;

		var title = results ? <Title isHeader={true} name={util.raceTitle(results)} /> : null;

		return (
			<div className='big-map'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{title}
				{choropleth}
			</div>
		);
	}
});

module.exports = BigMap;