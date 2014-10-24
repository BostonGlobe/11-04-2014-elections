/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateSummary = require('./CandidateSummary.jsx');
var Precincts        = require('./Precincts.jsx');
var Party            = require('./CandidateParty.jsx');

var util             = require('../assets/js/util.js');

var CandidatesTable = React.createClass({

	render: function() {

		var candidateSummaries = null;
		var reportingUnit = this.props.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;
		var isLite = this.props.isLite;
		var isPrimary = this.props.isPrimary;
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

				// don't display party if it's ballot, or lite, or primary
				if (!(isBallot || isLite || isPrimary)) {
					components.push(<Party
						key={'party' + extendedResult.id}
						candidate={extendedResult}
						candidates={candidates}
					/>);
				}

				components.push(<CandidateSummary
					key={'candidate' + extendedResult.id}
					candidate={extendedResult}
					candidates={candidates}
					isBallot={isBallot}
					isPrimary={isPrimary}
					isLite={isLite}
					totalVotes={totalVotes}
				/>);

				return components;
			})
			.flatten()
			.value();

		precincts = (
			<Precincts reportingUnit={reportingUnit} hasIncumbent={hasIncumbent} />
		);

		var theadRows = isLite ? (<tr>
			<th className='candidate-name'></th>
			<th className='candidate-votes'></th>
		</tr>) : (<tr>
			<th className='candidate-name'></th>
			<th className='candidate-percent'></th>
			<th className='candidate-bar'></th>
			<th className='candidate-votes'></th>
		</tr>);

		return (
			<table className='candidates-table'>
				<thead>
					{theadRows}
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