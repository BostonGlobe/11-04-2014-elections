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

		var forDisplay = this.format(this.props.reportingUnit.precincts_reporting, this.props.reportingUnit.total_precincts);

		var incumbent = null;
		if (this.props.hasIncumbent) {
			incumbent = <td className='incumbent'>
				<span className='logo'>i</span>
				<span className='text'>incumbent</span>
			</td>;
		}

		var colSpan = this.props.hasIncumbent ? '2' : '100%';

		return (
			<tfoot className='precincts'>
				<tr>
					{incumbent}
					<td colSpan={colSpan}>
						<span className='precincts'>{forDisplay}% precincts reporting</span>
					</td>
				</tr>
			</tfoot>
		);
	}

});

module.exports = Precincts;