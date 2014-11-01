/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Donut             = require('../components/Donut.jsx');

var util              = require('../assets/js/util.js');

var Strip = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		return '/races/office/MA/Governor/?date=20141104';
	},

	render: function() {

		var results = this.state.results[0];

		var sections = { reporting: null , matchup: null , table: null };

		if(results) {
			var data = parseData(results);

			sections.reporting = sectionMaker.reporting(data);
			sections.matchup = sectionMaker.matchup(data);
			sections.table = sectionMaker.table(data);
		}

		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={true ? this.fetchResults : 'a'} />
				{sections.reporting}
				{sections.matchup}
				{sections.table}
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
	reporting: function(data) {
		return <div className='strip-section section-reporting'>
					<div className='strip-title'>Governor</div>
					<p className='percent-reporting'>
						<span>{data.percentReporting}</span> percent of precincts reporting
					</p>
					<p>
						<a href='#TODO'>Full results</a>
					</p>
					<div className='social-share'>
						Share results: <a className='social-icon tw' href='#'></a><a className='social-icon fb' href='#'></a>
					</div>
				</div>;
	},

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
	},

	table: function(data) {		
		var content = _.chain(data.other).map(function(id) {
			var c = data.candidates[id];
			var percent = data.totalVotes > 0 ? util.formatPercent(c.votes / data.totalVotes, 0) : 0;
			return <div className='table-row'>
					<div className='table-name'>{c.name}</div>
					<div className='table-votes'>{c.votesFormatted} votes</div>
					<div className='table-percent'>{percent}%</div>
					</div>;
		}).value();

		return <div className='strip-section section-table'> {content} </div>;
	}
};

module.exports = Strip;