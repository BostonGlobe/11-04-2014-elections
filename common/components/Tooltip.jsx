/**
 * @jsx React.DOM
 */

var React   = require('react');

var CandidatesTable = require('./CandidatesTable.jsx');

var Tooltip = React.createClass({

	getInitialState: function() {
		return {
			reportingUnit: null,
			coordinates: {
				x: 0,
				y: 0
			}
		};
	},

	render: function() {

		var table = null;
		var reportingUnit = this.state.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;

		var style = {
			bottom: (100 - this.state.coordinates.y) + '%',
			left: this.state.coordinates.x + '%',
			display: this.state.reportingUnit ? 'block' : 'none'
		};

		if (reportingUnit && candidates) {
			table = <CandidatesTable
				reportingUnit={reportingUnit}
				candidates={candidates}
				isBallot={isBallot}
				isLite={true}
			/>;
		}

		return (
			<div className='tooltip' style={style}>
				<div className='tooltip-inner'>
					{table}
				</div>
			</div>
		);
	}

});

module.exports = Tooltip;