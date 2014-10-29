/**
 * @jsx React.DOM
 */

var React             = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var Choropleth        = require('../components/Choropleth.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Title             = require('../components/Title.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');
var Tooltip           = require('../components/Tooltip.jsx');
var TownByTownResults = require('../components/TownByTownResults.jsx');

var REPORTING_UNITS   = require('../../data/output/MA/REPORTING_UNITS.json');

var util              = require('../assets/js/util.js');

var DetailedResults = React.createClass({

	mixins: [FetchResultsMixin],

	apiCallback: function() {
		var callback = [this.props.state, this.props.office, this.props.seat].join('').replace(/ /g, '');
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/' + this.props.state + '/' + this.props.office + '/' + this.props.seat + '?detail=true';
		return url;
	},

	tooltipCallback: function(opts) {
		this.refs.theTooltip.setState(opts);
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

		return (
			<div className='detailed-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Title isHeader={true} name={util.raceName(results)} />
				<ShareTools />
				<Summary results={results} />
				<div className='choropleth-container'>
					<Choropleth
						results={results}
						shapefile={REPORTING_UNITS}
						tooltipCallback={this.tooltipCallback}
					/>
					{tooltip}
				</div>
				<TownByTownResults results={results} />
			</div>
		);
	}

});

module.exports = DetailedResults;