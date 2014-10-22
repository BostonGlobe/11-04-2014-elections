/**
 * @jsx React.DOM
 */

var React = require('react');

var util  = require('../assets/js/util.js');

var CandidateTh = React.createClass({
	render: function() {

		var first = this.props.isFirst ? <div><span>Votes</span></div> : null;

		return (
			<th>
				<div><span>{this.props.candidate.last_name}</span></div>
				{first}
			</th>
		);
	}
});

var CandidateTd = React.createClass({
	render: function() {

		var totalVotes = this.props.totalVotes;
		var voteCount = this.props.candidate.vote_count;

		var pct = totalVotes > 0 ?
			util.formatPercent(voteCount/totalVotes, 1) :
			0;

		var votesForDisplay = util.numberWithCommas(this.props.candidate.vote_count);

		return (
			<td>
				<div><span>{pct}%</span></div>
				<div><span>{votesForDisplay}</span></div>
			</td>
		);
	}
});

var TownTr = React.createClass({
	render: function() {

		var candidates = this.props.candidates;

		var totalVotes = _.chain(candidates)
			.pluck('vote_count')
			.reduce(function(a, b) { return a + b; })
			.value();

		var candidateTds = _.map(candidates, function(candidate) {
			return <CandidateTd candidate={candidate} totalVotes={totalVotes} key={candidate.ap_candidate_id} />;
		});

		return (
			<tr>
				<td>
					<div><span>{this.props.name}</span></div>
					<div><span>{this.props.precinctsReporting} of {this.props.totalPrecincts}</span></div>
				</td>
				{candidateTds}
			</tr>
		);
	}
});

var TownByTownResults = React.createClass({

	render: function() {

		var component = null;
		var results = this.props.results;

		if (results) {

			var before = Date.now();

			var candidates = results.candidates;

			var summaryReportingUnit = _.find(results.reporting_units, {'fips_code': 0});
			var summaryReportingUnitCandidates = _.sortBy(summaryReportingUnit.results, function(result) {
				return -result.vote_count;
			});
			var summaryReportingUnitCandidateIds = _.pluck(summaryReportingUnitCandidates, 'ap_candidate_id');

			var candidateThs = _.chain(summaryReportingUnitCandidates)
				.map(function(result, index) {

					// find this result's candidate
					var candidate = _.find(candidates, {id:result.ap_candidate_id});

					// extend result with candidate information
					var extendedResult = _.extend({}, result, candidate);

					return <CandidateTh
						candidate={extendedResult} 
						isFirst={index === 0}
						key={extendedResult.id} />;
				})
				.value();

			var townTrs = _.chain(results.reporting_units)
				.sortBy('county_name')
				.map(function(reporting_unit) {

					var name = reporting_unit.county_name;

					var theseCandidates = _.sortBy(reporting_unit.results, function(result) {
						return _.indexOf(summaryReportingUnitCandidateIds, result.ap_candidate_id);
					});

					// really make sure they're the same order
					if (!_.isEqual(_.pluck(theseCandidates, 'ap_candidate_id'), summaryReportingUnitCandidateIds)) {
						throw Exception('DATA IS WRONG');
					}

					return <TownTr
						name={name}
						key={name}
						precinctsReporting={reporting_unit.precincts_reporting}
						totalPrecincts={reporting_unit.total_precincts}
						candidates={theseCandidates}
					/>;
				})
				.value();

			var after = Date.now();
			console.log('rendering town-by-town-results took ' + (after - before) + ' ms');

			component = (
				<div className='town-by-town-results'>
					<div className='title'>Town by town results</div>
					<table>
						<thead>
							<tr>
								<th>
									<div><span>City/town</span></div>
									<div><span>Pcts. reporting</span></div>
								</th>
								{candidateThs}
							</tr>
						</thead>
						<tbody>
							{townTrs}
						</tbody>
					</table>
				</div>
			);
		}

		return component;
	}

});

module.exports = TownByTownResults;