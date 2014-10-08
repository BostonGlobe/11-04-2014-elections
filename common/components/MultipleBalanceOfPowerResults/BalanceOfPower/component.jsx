/**
 * @jsx React.DOM
 */

var React = require('react');

var BalanceOfPower = React.createClass({

	getChangeSign: function(change) {

		// two cases
		// change >= 0: return +
		// change < 0: return -
		return change >= 0 ? '+' : '-';
	},

	render: function() {

		var office = this.props.office;

		var total = office.democrats + office.republicans + office.undecided;

		var barWidths = {
			democrats: {
				width: (100*office.democrats/total).toFixed(0) + '%'
			},
			republicans: {
				width: (100*office.republicans/total).toFixed(0) + '%'
			}
		};

		var republican;

		if (this.props.minWidth < 400) {
			republican = <div className='republican'>
				<div className='number'><span>{office.republicans}</span></div>
				<div className='label'><span>Republicans</span></div>
			</div>;
		} else {
			republican = <div className='republican'>
				<div className='label'><span>Republicans</span></div>
				<div className='number'><span>{office.republicans}</span></div>
			</div>;
		}

		return (
			<div className={'_' + this.props.minWidth + ' balance-of-power'}>
				<div className='title'>{office.office} balance of power</div>
				<div className='numbersAndLabels'>
					<div className='democratic'>
						<div className='number'><span>{office.democrats}</span></div>
						<div className='label'><span>Democrats</span></div>
					</div>
					<div className='undecided'>
						<div className='number'><span>{office.undecided}</span></div>
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
						<span>{this.getChangeSign(office.democratsChange)}{Math.abs(office.democratsChange)} seats</span>
					</div>
					<div className='republican'>
						<span>{this.getChangeSign(office.republicansChange)}{Math.abs(office.republicansChange)} seats</span>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPower;