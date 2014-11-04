/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var Precincts = React.createClass({

	statics: {

		format: function(reporting, total) {

			// cases:
			// 0 reporting  /    0 total -> display 0%
			// 0 reporting  / 1231 total -> display 0%
			// 11 reporting /   11 total -> display 100%
			// actually, don't display decimal points
			// and simply floor down
			var display = '';

			if (reporting === 0 || total === 0) {
				display = '0';
			} else {
				display = Math.floor(100*reporting/total);
			}

			return display;
		}

	},

	render: function() {

		var reportingUnit = this.props.reportingUnit;

		var isUncontested = reportingUnit.results.length < 2;

		var forDisplay = Precincts.format(reportingUnit.precincts_reporting, reportingUnit.total_precincts);

		var incumbent;
		if (this.props.hasIncumbent && !this.props.isLite) {
			incumbent = <div className='incumbent'>
				<span className='logo'>i</span>
				<span className='text'>incumbent</span>
			</div>;
		} else {
			incumbent = <div className='incumbent'>
				<span className='text'>&nbsp;</span>
			</div>;
		}

		var precincts = !isUncontested ? (
			<div className='precincts'>
				<span>{forDisplay}% precincts reporting</span>
			</div>) : null;

		return (
			<div className='candidates-precincts'>
				{incumbent}
				{precincts}
			</div>
		);
	}

});

module.exports = Precincts;