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
			republicansChange: 2,
			width: 0
		};
	},

	// from http://stackoverflow.com/a/19014495/64372
	updateStyling: function() {
		var width = $(this.getDOMNode()).width();

		// from http://stackoverflow.com/a/584953/64372
		var roundedDownWidth = 100 * Math.floor((width) / 100);
		this.setState({width: roundedDownWidth});
	},
	componentDidMount: function() {
		this.updateStyling();
		window.addEventListener('resize', this.updateStyling);
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

		var republican;

		if (this.state.width < 400) {
			republican = <div className='republican'>
				<div className='number'><span>{this.state.republicans}</span></div>
				<div className='label'><span>Republicans</span></div>
			</div>;
		} else {
			republican = <div className='republican'>
				<div className='label'><span>Republicans</span></div>
				<div className='number'><span>{this.state.republicans}</span></div>
			</div>;
		}

		return (
			<div className={'_' + this.state.width + ' balance-of-power-results'}>
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
					{republican}
				</div>
				<div className='bars'>
					<div className='democratic' style={barWidths.democrats}>&nbsp;</div>
					<div className='republican' style={barWidths.republicans}>&nbsp;</div>
				</div>
				<div className='change'>
					<div className='democratic'>
						<span>{this.getChangeSign(this.state.democratsChange)}{Math.abs(this.state.democratsChange)} seats</span>
					</div>
					<div className='republican'>
						<span>{this.getChangeSign(this.state.republicansChange)}{Math.abs(this.state.republicansChange)} seats</span>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPowerResults;