/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Precincts         = require('../components/Precincts.jsx');
var Donut             = require('../components/Donut.jsx');

var util              = require('../assets/js/util.js');

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

			reporting = <Reporting name={results.office_name} reportingUnit={reportingUnit} />;
			table = <Table totalVotes={totalVotes} candidates={independents} />;
		}

		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{reporting}
				{table}
			</div>
		);
	}

});

var parseData = function(results) {
	var data = {
		candidates: {},
		republican: [],
		democrat: [],
		other: [],
		totalVotes: 0,
		percentReporting: null
	};

	var candidates = results['candidates'];
	var reportingUnits = results['reporting_units'][0];

	
	candidates.forEach(function(candidate) {
		data.candidates[candidate['id']] = { name: candidate['first_name'] + ' ' + candidate['last_name'] }
	});

	var rawPercent = reportingUnits['precincts_reporting'] / reportingUnits['total_precincts'];
	data.percentReporting = util.formatPercent(rawPercent, 0);

	reportingUnits['results'].forEach(function(candidate) {
		var id = candidate['ap_candidate_id'];
		var party = util.partyAbbreviationToParty(candidate['party']) || 'other';
		var storedCandidated = data.candidates[id];

		storedCandidated.party = party;
		storedCandidated.votes = candidate['vote_count'];
		storedCandidated.votesFormatted = util.numberWithCommas(candidate['vote_count']);
		storedCandidated.winner = candidate['winner'] === 'X' ? 'winner' : '';

		data.totalVotes += candidate['vote_count'];

		data[party].push(id);
	});

	util.log(data);
	return data;
}

var sectionMaker = {
	matchup: function(data) {
		
		var d = data.candidates[data.democrat[0]];
		var r = data.candidates[data.republican[0]];

		var dClass = 'matchup-container ' + d.winner;
		var rClass = 'matchup-container ' + r.winner;


		var dPercent = data.totalVotes > 0 ? util.formatPercent(d.votes / data.totalVotes, 0) : 0;
		var rPercent = data.totalVotes > 0 ? util.formatPercent(r.votes / data.totalVotes, 0) : 0;

		// http://codepen.io/Kseso/pen/phiyL
		return <div className='strip-section section-matchup'>
					<div className={dClass}>
						<div className='fl matchup-left'> 
							<div className='matchup-party'>Democrat</div>
							<div className='matchup-name'>{d.name}</div>
							<div className='matchup-votes'>{d.votesFormatted} votes</div>
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
					<div className={rClass}>
						<div className='fl matchup-left'> 
							<div className='matchup-party'>Republican</div>
							<div className='matchup-name'>{r.name}</div>
							<div className='matchup-votes'>{r.votesFormatted} votes</div>
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
				</div>;
	}
};

module.exports = Strip;