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

		var summaryReportingUnit = _.find(this.props.race.reporting_units, {fips_code: 0});

		// Row needs two things:
		// the actual result,
		// and the total number of votes,
		// so that we can calculate pct. reporting

		return (
			<div>
				<table className='summary-table'>
					<Header race={this.props.race} />
					<Precincts reportingUnit={summaryReportingUnit} />
					<tbody>
						<Row />
					</tbody>
				</table>
				<pre>{JSON.stringify(this.props.race, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = SummaryTable;