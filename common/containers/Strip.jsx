/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Precincts         = require('../components/Precincts.jsx');
var Donut             = require('../components/Donut.jsx');
var Knob              = require('../components/Knob.jsx');

var util              = require('../assets/js/util.js');

var Matchup = React.createClass({

	render: function() {

		// http://codepen.io/Kseso/pen/phiyL

		// this is used to set classes
		var cx = React.addons.classSet;

		// this component only receives candidates and total votes
		var candidates = this.props.candidates;
		var totalVotes = this.props.totalVotes;

		var matchups = _.chain(candidates)
			.sortBy('party')
			.map(function(candidate) {

				var name = candidate.last_name;
				var party = candidate.party;
				var votes = candidate.vote_count;

				var percentForDisplay = totalVotes > 0 ?
					util.formatPercent(votes/totalVotes, 1) :
					0;

				// this is silly, it duplicates most
				// of the above. be smarter.
				var percent = totalVotes > 0 ?
					votes/totalVotes :
					0;

				percent = Math.random();

				var isWinner = candidate.winner === 'X';

				// this is purely for utility,
				// a really nice way of avoiding string concatenation
				// for class creation
				var classes = cx({
					'matchup-container': true,
					'winner': isWinner
				});

				return (
					<div className={classes} key={candidate.id}>
						<Knob percent={percent * 100} isWinner={isWinner} />
						<div className='fl matchup-left'> 
							<div className='matchup-party'>{party}</div>
							<div className='matchup-name'>{name}</div>
							<div className='matchup-votes'>{percentForDisplay}%</div>
						</div>
						<div className='fl matchup-middle'> 
							<div className='matchup-pic'>
								<img src='http://placehold.it/100x100.jpg'/>
							</div>
						</div>
						<div className='fl matchup-right'> 
							<div className='matchup-donut'>
								<div className='donut-box'> 
									<div className='donut-content'></div> 
								</div>
							</div>
						</div>
					</div>
				);

			})
			.value();

		return (
			<div className='strip-section section-matchup'>
				{matchups}
			</div>
		);
	}

});

var Table = React.createClass({

	render: function() {

		// this component only receives candidates (most likely independents)
		// and total votes
		var candidates = this.props.candidates;
		var totalVotes = this.props.totalVotes;

		var rows = _.chain(candidates)
			.sortBy(function(candidate) {
				return -candidate.vote_count;
			})
			.map(function(candidate) {

				var name = candidate.last_name;
				var votes = candidate.vote_count;
				var votesForDisplay = util.numberWithCommas(votes);

				var pct = totalVotes > 0 ?
					util.formatPercent(votes/totalVotes, 1) :
					0;

				return <div className='table-row' key={candidate.id}>
					<div className='table-name'>{name}</div>
					<div className='table-votes'>{votesForDisplay}</div>
					<div className='table-percent'>{pct}%</div>
				</div>;
			})
			.value();

		return (
			<div className='strip-section section-table'>
				{rows}
			</div>
		);
	}

});

var Reporting = React.createClass({

	render: function() {

		// this component only receives name and reportingUnit
		var name = this.props.name;
		var reportingUnit = this.props.reportingUnit;

		// call static method of Precincts component
		var precincts = Precincts.format(reportingUnit.precincts_reporting, reportingUnit.total_precincts);

		return (
			<div className='strip-section section-reporting'>
				<div className='strip-title'>{name}</div>
				<p className='percent-reporting'>
					<span>{precincts}</span>% of precincts reporting
				</p>
				<p>
					<a href='#TODO'>Full results</a>
				</p>
				<div className='social-share'>
					Share results: <a className='social-icon tw' href='#'></a><a className='social-icon fb' href='#'></a>
				</div>
			</div>
		);
	}

});

var Strip = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		return '/races/office/MA/Governor/?date=20141104';
	},

	// override FetchResultsMixin.defaultAllResultsAreIn
	// make it return false to simulate race isn't complete,
	// so we can see the clock
	allResultsAreIn: function() {
		return false;
	},

	render: function() {

		var results = this.state.results[0];

		var reporting = null;
		var matchup = null;
		var table = null;

		if (results) {

			// we only want the summary reporting unit
			var reportingUnit = _.find(results.reporting_units, {fips_code: 0});

			// calculate total votes here, since <Table /> and <Matchup /> will need it
			var totalVotes = _.chain(reportingUnit.results)
				.pluck('vote_count')
				.reduce(function(a, b) { return a + b; })
				.value();

			// get the personal info fields
			var candidates = results.candidates;

			// this will hold personal info AND vote information
			var extendedCandidates = [];

			// we need to merge both personal info and vote information
			reportingUnit.results.forEach(function(result) {

				// find this result's candidate
				var candidate = _.find(candidates, {id:result.ap_candidate_id});

				// extend result with candidate information
				extendedCandidates.push(_.extend({}, result, candidate));
			});

			// now, get independents - this array has ALL relevant candidate info (including votes)
			var independents = _.reject(extendedCandidates, function(result) {
				return result.party === 'Dem' || result.party === 'GOP';
			});

			// get dem or gop - we could probably do this using set operations on independents,
			// but i don't know if lodash does deep comparison
			var mainstreamers = _.filter(extendedCandidates, function(result) {
				return result.party === 'Dem' || result.party === 'GOP';
			});

			reporting = <Reporting name={results.office_name} reportingUnit={reportingUnit} />;
			table = <Table totalVotes={totalVotes} candidates={independents} />;
			matchup = <Matchup totalVotes={totalVotes} candidates={mainstreamers} />;
		}

		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{reporting}
				{matchup}
				{table}
			</div>
		);
	}

});

module.exports = Strip;