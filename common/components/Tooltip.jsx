/**
 * @jsx React.DOM
 */

var React   = require('react');

var CandidatesTable = require('./CandidatesTable.jsx');

var Tooltip = React.createClass({

	render: function() {

		var table = null;
		var reportingUnit = this.props.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;

		if (reportingUnit && candidates) {
			table = <CandidatesTable
				reportingUnit={reportingUnit}
				candidates={candidates}
				isBallot={isBallot}
				isLite={true}
			/>;
		}

		return (
			<div className='tooltip'>
				{table}
			</div>
		);
	}

});

module.exports = Tooltip;