/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateSummary = require('./CandidateSummary.jsx');
var Precincts        = require('./Precincts.jsx');
var Party            = require('./CandidateParty.jsx');

var CandidatesTable = React.createClass({

	render: function() {

		var candidateSummaries = null;
		var reportingUnit = this.props.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;
		var precincts = null;

		// <CandidateSummary /> needs the total number of votes
		// so that we can calculate pct. reporting
		var totalVotes = _.chain(reportingUnit.results)
			.pluck('vote_count')
			.reduce(function(a, b) { return a + b; })
			.value();

		var hasIncumbent = _.find(reportingUnit.results, {incumbent: true});

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
				var extendedResult = _.extend({}, result, candidate);

				var components = [];
				components.push(<Party candidate={extendedResult} isBallot={isBallot} key={'party' + extendedResult.id} />);
				components.push(<CandidateSummary candidate={extendedResult} key={'candidate' + extendedResult.id} totalVotes={totalVotes} isBallot={isBallot} />);

				return components;
			})
			.flatten()
			.value();

		precincts = (
			<Precincts reportingUnit={reportingUnit} hasIncumbent={hasIncumbent} />
		);

		return (
			<table className='candidates-table'>
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

module.exports = CandidatesTable;