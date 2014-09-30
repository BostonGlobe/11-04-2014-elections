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
var util = require('../../../../../common/js/util.js');

var SummaryTable = React.createClass({

	render: function() {

		var race = this.props.race;

		var candidates = race.candidates;

		var summaryReportingUnit = _.find(race.reporting_units, {fips_code: 0});

		// <Row /> needs the total number of votes
		// so that we can calculate pct. reporting
		var totalVotes = _.chain(summaryReportingUnit.results)
			.pluck('vote_count')
			.reduce(function(a, b) { return a + b; })
			.value();

		// For primaries,
		// each <Row /> has to have a unique color,
		// and this color can't change at all once it's sees use.
		// otherwise people might share a screenshot of a map or table,
		// and go to the site, and then the colors have changed! Oops.
		// So. We have to take a unique identifier from each candidate
		// and map that to a number, which we will then use
		// to style the row.
		// Where should this functionality go? Should we pass it on
		// from here, or should it be up to the Row to fetch the info?
		// If we leave it up to the <Row /> then we have to give it
		// all the other candidates as well. Let's compute the info here.
		// This is actually much simpler than I thought. Each candidate gets
		// a classname based on the index of its id in the ordered list
		// of candidate ids here:
		var candidateIds = _.chain(candidates)
			.sortBy('id')
			.pluck('id')
			.value();

		// For the general election,
		// we'll color rows with the candidate party.

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

				// assign class to candidate - e.g. color_1 (or) democratic
				var className = race.race_type === 'Primary' ?
					('color_' + _.indexOf(candidateIds, result.ap_candidate_id)) :
					util.raceTypeIDToParty(race.race_type_id);

				return (
					<Row className={className} result={extendedResult} key={extendedResult.id} totalVotes={totalVotes} />
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