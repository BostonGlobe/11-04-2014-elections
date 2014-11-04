/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Precincts         = require('../components/Precincts.jsx');
var Knob              = require('../components/Knob.jsx');
var Summary           = require('../components/Summary.jsx');
var Title             = require('../components/Title.jsx');
var FullResultsButton = require('../components/FullResultsButton.jsx');

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

				var name = candidate.first_name + ' ' + candidate.last_name;
				var party = candidate.party === 'Dem' ? 'Democrat' : 'Republican';
				var votes = candidate.vote_count;

				var votesForDisplay = util.numberWithCommas(votes);

				var percentForDisplay = totalVotes > 0 ?
					util.formatPercent(votes/totalVotes, 0) :
					0;

				// this is silly, it duplicates most
				// of the above. be smarter.
				var percent = totalVotes > 0 ?
					Math.round(votes/totalVotes * 100) :
					0;

				var isWinner = candidate.winner === 'X';

				var isDemocrat = party === 'Democrat';
				var isRepublican = party === 'Republican';

				// this is purely for utility,
				// a really nice way of avoiding string concatenation
				// for class creation
				var containerClasses = cx({
					'matchup-container': true,
					'winner': isWinner
				});

				var donutClasses = cx({
					'matchup-donut': true,
					'hide-large': false
				});

				var partyClasses = cx({
					'matchup-party': true,
					'democrat': isDemocrat,
					'republican': isRepublican
				});

				var percentClasses = cx({
					'show-large': true,
					'matchup-percent': true,
					'democrat': isDemocrat,
					'republican': isRepublican
				});
				
				var imageUrl = 'http://cache.boston.com/multimedia/graphics/projectFiles/2014/11/assets/candidate-photos/2014-11-04-ma-governor-' + candidate.last_name.toLowerCase() + '.png';
				return (
					<div className={containerClasses} key={candidate.id}>
						<div className='fl matchup-left'> 
							<div className={partyClasses}>{party}</div>
							<div className='matchup-name'>{name} <span className={percentClasses}>{percent}%</span></div>
							<div className='matchup-votes'>{votesForDisplay} votes</div>
						</div>
						<div className='fl matchup-middle hide-large'> 
							<div className='matchup-pic'>
								<img src={imageUrl} />
							</div>
						</div>
						<div className='fl matchup-right'> 
							<div className={donutClasses}>
								<Knob percent={percent} isWinner={isWinner} party={party} />
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

				var name = candidate.first_name + ' ' + candidate.last_name;
				var votes = candidate.vote_count;
				var votesForDisplay = util.numberWithCommas(votes);

				var pct = totalVotes > 0 ?
					util.formatPercent(votes/totalVotes, 0) :
					0;

				return <div className='table-row' key={candidate.id}>
					<div className='table-name'>{name}</div>
					<div className='table-votes'>{votesForDisplay} votes</div>
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
					<a href='/news/politics/election-results/2014-11-04/race/MA/Governor'>Go to full results</a>
				</p>
			</div>
		);

		// <div className='social-share'>
		// 			Share <span className='hide-large'>results</span>: <a className='social-icon tw' target='_blank' href='#'></a><a className='social-icon fb' target='_blank' href='#'></a>
		// 		</div>
	}

});

var Strip = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		return '/races/office/MA/Governor/?date=20141104';
	},

	render: function() {

		var results = this.state.results[0];

		var output = null;

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

			if (this.state.isFull) {
				output = <div>
					<Reporting name={results.alternate_office_name} reportingUnit={reportingUnit} />
					<Matchup totalVotes={totalVotes} candidates={mainstreamers} />
					<Table totalVotes={totalVotes} candidates={independents} />
				</div>;
			} else {
				var url = '/news/politics/election-results/2014-11-04/race/MA/Governor';

				output = <div>
					<Title isHeader={true} name={util.raceTitle(results)} />
					<Summary results={results} />
					<FullResultsButton url={url} />
				</div>;
			}
		}

		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{output}
			</div>
		);
	},

	componentDidMount: function() {
		var self = this;
		function resize() {
			var w = $(window).width();
			if (self.isMounted()) {
				self.setState({isFull: w > 767 });
			}
		}
		window.addEventListener('resize', _.debounce(function() {
			resize();
		}, 150));
		resize();
	},

	getInitialState: function() {
		return {
			isFull: true
		};
	}

});

module.exports = Strip;

