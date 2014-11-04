/**
 * @jsx React.DOM
 */

var React    = require('react');

var Title    = require('./Title.jsx');

var util     = require('../assets/js/util.js');

var BalanceOfPower = React.createClass({

	statics: {

		transformResults: function(input) {

			var results = {
				name: input.trendtable.office.replace(/\./g, '')
			};

			var parties = input.trendtable.party.map(function(party) {

				var Won       = _.find(party.trend, {name: 'Won'}).value;
				var Holdovers = _.find(party.trend, {name: 'Holdovers'}).value;
				var Leading   = _.find(party.trend, {name: 'Leading'}).value;
				var NetChangeWinners = _.find(party.NetChange.trend, {name: 'Winners'}).value;

				return {
					name: party.title,
					'WonHoldovers': Won + Holdovers,
					'NetChangeWinners': NetChangeWinners,
					'Leading': Leading
				};
			});

			results.parties = parties;

			return results;
		}

	},

	render: function() {

		return (
			<pre>{JSON.stringify(this.props, null, 4)}</pre>
		);

		// var results = this.props.results;

		// var total =
		// 	results.Dem.WonHoldovers +
		// 	results.GOP.WonHoldovers +
		// 	results.Others.WonHoldovers;

		// var democratBar = {
		// 	width: (100 * results.Dem.WonHoldovers/total) + '%'
		// };

		// var republicanBar = {
		// 	width: (100 * results.GOP.WonHoldovers/total) + '%'
		// };

		// return (
		// 	<div className='balance-of-power'>
		// 		<RaceName name={BalanceOfPower.getNameFromFeed(this.props.results)} />
		// 		<div className='bars'>
		// 			<div className='democrat' style={democratBar}>&nbsp;</div>
		// 			<div className='republican' style={republicanBar}>&nbsp;</div>
		// 		</div>
		// 		<div className='total'>
		// 			<div className='democrat'><span>{results.Dem.WonHoldovers} democrats</span></div>
		// 			<div className='republican'><span>{results.GOP.WonHoldovers} republicans</span></div>
		// 			<div className=' undecided'><span>{results.Others.WonHoldovers} undecided</span></div>
		// 		</div>
		// 		<div className='change'>
		// 			<div className='democrat'><span>{results.Dem.NetChangeWinners} seats</span></div>
		// 			<div className='republican'><span>{results.GOP.NetChangeWinners} seats</span></div>
		// 		</div>
		// 	</div>
		// );
	}

});

module.exports = BalanceOfPower;