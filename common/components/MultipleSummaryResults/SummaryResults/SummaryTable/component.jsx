/**
 * @jsx React.DOM
 */

/**
 * Assumptions: we're only interested in the summary-level results,
 * which means the reporting_unit with fips_code = 0
 */

var React = require('react');
var Header = require('./Header.jsx');
var Row = require('./Row.jsx');
var Precincts = require('./Precincts.jsx');

var SummaryTable = React.createClass({

	render: function() {

		var candidates = this.props.race.candidates;

		var summaryReportingUnit = _.find(this.props.race.reporting_units, {fips_code: 0});

		// Row needs the total number of votes
		// so that we can calculate pct. reporting
		var totalVotes = _.chain(summaryReportingUnit.results)
			.pluck('vote_count')
			.reduce(function(a, b) { return a + b; })
			.value();

		var rows = _.chain(summaryReportingUnit.results)
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
					<Row result={extendedResult} key={extendedResult.id} totalVotes={totalVotes} />
				);
			})
			.value();

		return (
			<div>
				<table className='summary-table'>
					<Header race={this.props.race} />
					<Precincts reportingUnit={summaryReportingUnit} />
					<tbody>{rows}</tbody>
				</table>
			</div>
		);
	}

});

module.exports = SummaryTable;