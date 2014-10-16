/**
 * @jsx React.DOM
 */

var React = require('react');

var Precincts = React.createClass({

	statics: {

		getDisplay: function(reporting, total) {

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

			return display + '% precincts reporting';
		}
	},

	render: function() {

		return (
			<tfoot>
				<tr>
					<td colSpan='100%'>{Precincts.getDisplay(this.props.reportingUnit.precincts_reporting, this.props.reportingUnit.total_precincts)}</td>
				</tr>
			</tfoot>
		);
	}

});

module.exports = Precincts;