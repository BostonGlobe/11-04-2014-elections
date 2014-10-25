/**
 * @jsx React.DOM
 */

var React = require('react');

var util  = require('../assets/js/util.js');

var BalanceOfPower = React.createClass({

	render: function() {

		var results = {};

		_.chain(this.props.results.trendtable.party)
			.forEach(function(party) {

				var Won       = _.find(party.trend, {name: 'Won'}).value;
				var Holdovers = _.find(party.trend, {name: 'Holdovers'}).value;
				var NetChangeWinners = _.find(party.NetChange.trend, {name: 'Winners'}).value;

				results[party.title] = {
					'WonHoldovers': Won + Holdovers,
					'NetChangeWinners': NetChangeWinners
				};
			});

		var total =
			results.Dem.WonHoldovers +
			results.GOP.WonHoldovers +
			results.Others.WonHoldovers;

		var democraticBar = {
			width: (100 * results.Dem.WonHoldovers/total) + '%'
		};

		var republicanBar = {
			width: (100 * results.GOP.WonHoldovers/total) + '%'
		};

		return (
			<div className='balance-of-power'>
				<div className='bars'>
					<div className='democratic' style={democraticBar}>&nbsp;</div>
					<div className='republican' style={republicanBar}>&nbsp;</div>
				</div>
				<div className='total'>
					<div className='democratic'><span>{results.Dem.WonHoldovers} democrats</span></div>
					<div className='republican'><span>{results.GOP.WonHoldovers} republicans</span></div>
					<div className=' undecided'><span>{results.Others.WonHoldovers} undecided</span></div>
				</div>
				<div className='change'>
					<div className='democratic'><span>{results.Dem.NetChangeWinners} seats</span></div>
					<div className='republican'><span>{results.GOP.NetChangeWinners} seats</span></div>
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPower;