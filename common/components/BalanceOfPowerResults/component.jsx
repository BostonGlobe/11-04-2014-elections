/**
 * @jsx React.DOM
 */

var React = require('react');

var BalanceOfPowerResults = React.createClass({

	getChangeSign: function(change) {

		// two cases
		// change >= 0: return +
		// change < 0: return -
		return change >= 0 ? '+' : '-';
	},

	getInitialState: function() {
		return {
			democrats: 199,
			republicans: 234,
			undecided: 2,
			democratsChange: -2,
			republicansChange: 2
		};
	},

	render: function() {

		var total = this.state.democrats + this.state.republicans + this.state.undecided;

		var barWidths = {
			democrats: {
				width: (100*this.state.democrats/total).toFixed(0) + '%'
			},
			republicans: {
				width: (100*this.state.republicans/total).toFixed(0) + '%'
			}
		};

		return (
			<div className='balance-of-power-results'>

				<div className='title'>US House balance of power</div>
				<div className='numbersAndLabels'>
					<div className='democratic'>
						<div className='number'><span>{this.state.democrats}</span></div>
						<div className='label'><span>Democrats</span></div>
					</div>
					<div className='undecided'>
						<div className='number'><span>{this.state.undecided}</span></div>
						<div className='label'><span>Undecided</span></div>
					</div>
					<div className='republican'>
						<div className='number'><span>{this.state.republicans}</span></div>
						<div className='label'><span>Republicans</span></div>
					</div>
				</div>
				<div className='bars'>
					<div className='democratic' style={barWidths.democrats}>&nbsp;</div>
					<div className='republican' style={barWidths.republicans}>&nbsp;</div>
				</div>
				<div className='change'>
					<div className='democratic'>
						<div><span>{this.getChangeSign(this.state.democratsChange)}{Math.abs(this.state.democratsChange)} seats</span></div>
					</div>
					<div className='republican'>
						<div><span>{this.getChangeSign(this.state.republicansChange)}{Math.abs(this.state.republicansChange)} seats</span></div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPowerResults;