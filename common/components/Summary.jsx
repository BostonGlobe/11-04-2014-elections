/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateSummary = require('./CandidateSummary.jsx');

var Summary = React.createClass({

	render: function() {

		var candidateSummaries = null;
		var results = this.props.results;

		if (results) {

			var isBallot = results.race_type === 'Ballot Issue';

			// we're only interested in the top-level results
			var reportingUnit = _.find(results.reporting_units, {fips_code: 0});
			console.log(JSON.stringify(reportingUnit, null, 4));

			// <CandidateSummary /> needs the total number of votes
			// so that we can calculate pct. reporting
			var totalVotes = _.chain(reportingUnit.results)
				.pluck('vote_count')
				.reduce(function(a, b) { return a + b; })
				.value();

			// we'll also need the list of candidates
			var candidates = results.candidates;
			console.log(JSON.stringify(candidates, null, 4));

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

					return (
						<CandidateSummary candidate={extendedResult} key={extendedResult.id} totalVotes={totalVotes} isBallot={isBallot} />
					);
				})
				.value();
		}

		return (
			<div className='summary'>
				{candidateSummaries}
			</div>
		);
	}

});

module.exports = Summary;