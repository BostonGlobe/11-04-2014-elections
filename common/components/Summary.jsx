/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateSummary = require('./CandidateSummary.jsx');
var SummaryPrecincts = require('./SummaryPrecincts.jsx');
var Party            = require('./CandidateParty.jsx');

var util = require('../assets/js/util.js');

var Summary = React.createClass({

	render: function() {

		var candidateSummaries = null;
		var results = this.props.results;
		var precincts = null;

		if (results) {

			var isBallot = results.race_type === 'Ballot Issue';

			// we're only interested in the top-level results
			var reportingUnit = _.find(results.reporting_units, {fips_code: 0});

			// <CandidateSummary /> needs the total number of votes
			// so that we can calculate pct. reporting
			var totalVotes = _.chain(reportingUnit.results)
				.pluck('vote_count')
				.reduce(function(a, b) { return a + b; })
				.value();

			// we'll also need the list of candidates
			var candidates = results.candidates;

			// next, sort results by vote_count desc
			candidateSummaries = _.chain(reportingUnit.results)
				.sortBy(function(result) {
					// sort rows by vote_count descending
					return -result.vote_count;
				})
				.map(function(result) {

					// find this result's candidate
					var candidate = _.find(candidates, {id:result.ap_candidate_id});

					// extend result with candidate information
					var extendedResult = _.extend(result, candidate);

					var components = [];
					components.push(<Party candidate={extendedResult} isBallot={isBallot} key={'party' + extendedResult.id} />);
					components.push(<CandidateSummary candidate={extendedResult} key={'candidate' + extendedResult.id} totalVotes={totalVotes} isBallot={isBallot} />);

					return components;
				})
				.flatten()
				.value();

			precincts = (
				<SummaryPrecincts reportingUnit={reportingUnit} />
			);
		}

		return (
			<table className='summary'>
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				{precincts}
				<tbody>
					{candidateSummaries}
				</tbody>

			</table>
		);
	}

});

module.exports = Summary;













