/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var Precincts = React.createClass({

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
	},

	render: function() {

		var reportingUnit = this.props.reportingUnit;

		var isUncontested = reportingUnit.results.length < 2;

		var forDisplay = this.format(reportingUnit.precincts_reporting, reportingUnit.total_precincts);

		var incumbent;
		if (this.props.hasIncumbent && !this.props.isLite) {
			incumbent = <td className='incumbent'>
				<span className='logo'>i</span>
				<span className='text'>incumbent</span>
			</td>;
		} else {
			incumbent = <td className='incumbent'>
				<span className='text'>&nbsp;</span>
			</td>;
		}

		var precincts = !isUncontested ? (
			<td className='precincts'>
				<span>{forDisplay}% precincts reporting</span>
			</td>) : null;

		return (
			<tfoot>
				<tr>
					{incumbent}
					{precincts}
				</tr>
			</tfoot>
		);
	}

});

module.exports = Precincts;