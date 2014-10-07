/**
 * @jsx React.DOM
 */

var React = require('react');

var BalanceOfPowerResults = React.createClass({

	getInitialState: function() {
		return {
			democrats: 200,
			republicans: 233,
			undecided: 10,
			democratsChange: 8,
			republicansChange: -8
		};
	},

	render: function() {
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
					<div className='democratic'>&nbsp;</div>
					<div className='republican'>&nbsp;</div>
				</div>
				<div className='change'>
					<div className='democratic'>
						<div><span>+{this.state.democratsChange} seats</span></div>
					</div>
					<div className='republican'>
						<div><span>+{this.state.republicansChange} seats</span></div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPowerResults;