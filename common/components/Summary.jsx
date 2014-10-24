/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidatesTable  = require('./CandidatesTable.jsx');

var util             = require('../assets/js/util.js');

var Summary = React.createClass({

	render: function() {

		var results = this.props.results;
		var candidatesTable = null;

		if (results) {

			var isBallot = results.race_type === 'Ballot Issue';
			var isPrimary = results.race_type === 'Primary';

			// we're only interested in the top-level results
			var reportingUnit = _.find(results.reporting_units, {fips_code: 0});

			// we'll also need the list of candidates
			var candidates = results.candidates;

			candidatesTable = (
				<CandidatesTable
					reportingUnit={reportingUnit}
					candidates={candidates}
					isBallot={isBallot}
					isPrimary={isPrimary}
				/>
			);
		}

		return (
			<div className='summary'>
				{candidatesTable}
			</div>
		);
	}

});

module.exports = Summary;