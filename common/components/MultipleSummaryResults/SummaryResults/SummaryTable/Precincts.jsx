/**
 * @jsx React.DOM
 */

var React = require('react');

var Precincts = React.createClass({

	render: function() {

		// cases:
		// 0/0 - display 0%
		// 0/1231 - display 0%
		// 11/11 - display 100%
		// actually, don't display decimal points
		// and simply floor down

		var reporting = this.props.reportingUnit.precincts_reporting;
		var total = this.props.reportingUnit.total_precincts;

		var display = '';

		if (reporting === 0 || total === 0) {
			display = '0';
		} else {
			display = Math.floor(100*reporting/total);
		}

		return (
			<tfoot>
				<tr>
					<td colSpan='100%'>{display}% precincts reporting</td>
				</tr>
			</tfoot>
		);
	}

});

module.exports = Precincts;