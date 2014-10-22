/**
 * @jsx React.DOM
 */

var React   = require('react');

var CandidatesTable = require('./CandidatesTable.jsx');

var Tooltip = React.createClass({

	getInitialState: function() {
		return {
			x: 0,
			y: 0,
			show: false
		};
	},

	updatePosition: function(coordinates) {
		if (coordinates) {
			this.setState({
				x: coordinates.x,
				y: coordinates.y,
				show: true
			});
		} else {
			this.setState({
				show: false
			});
		}
	},

	render: function() {

		var table = null;
		var reportingUnit = this.props.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;

		var style = {
			bottom: (110 - this.state.y) + '%',
			left: this.state.x - 10 + '%',
			display: this.state.show ? 'block' : 'none'
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
				{table}
			</div>
		);
	}

});

module.exports = Tooltip;