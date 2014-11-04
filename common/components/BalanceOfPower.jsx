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

		var results = this.props.results;

		var Dem = _.find(results.parties, {name: 'Dem'});
		var GOP = _.find(results.parties, {name: 'GOP'});
		var Ind = _.find(results.parties, {name: 'Others'});

		// we need the count for dem,gop,ind,undecided
		var demSeats = Dem.WonHoldovers;
		var gopSeats = GOP.WonHoldovers;
		var indSeats = Ind.WonHoldovers;
		var undecidedSeats = Dem.Leading + GOP.Leading + Ind.Leading;

		var total = demSeats + gopSeats + indSeats + undecidedSeats;

		var demBar = { width: (100 * demSeats/total) + '%' };
		var gopBar = { width: (100 * gopSeats/total) + '%' };
		var indBar = { width: (100 * indSeats/total) + '%' };
		var undecidedBar = { width: (100 * undecidedSeats/total) + '%' };

		// if net change is 0, force to '+0'
		Dem.NetChangeWinners = Dem.NetChangeWinners === 0 ? '+0' : Dem.NetChangeWinners;
		GOP.NetChangeWinners = GOP.NetChangeWinners === 0 ? '+0' : GOP.NetChangeWinners;

		// convert '0' to seats, '+1' to seat, '-2' to seats
		function seatOrdinal(count) {

			var absolute = +(count
				.replace(/\+/g, '') // remove +
				.replace(/-/g, '') // remove -
			);

			if (absolute === 0) {
				return ' seats';
			} else if (absolute === 1) {
				return ' seat';
			} else {
				return ' seats';
			}
		}

		var demChange = Dem.NetChangeWinners + seatOrdinal(Dem.NetChangeWinners);
		var gopChange = GOP.NetChangeWinners + seatOrdinal(GOP.NetChangeWinners);

		var key = null;

		var undecidedKey = undecidedSeats ?
			<div className='undecided'>
				<span className='square'>&nbsp;</span>
				<span className='text'>{undecidedSeats} undecided</span>
			</div> : null;

		var independentKey = indSeats ?
			<div className='independent'>
				<span className='text'>{indSeats} independents</span>
				<span className='square'>&nbsp;</span>
			</div> : null;

		return (
			<div className='balance-of-power'>
				<Title name={results.name} />
				<div className='bars'>
					<div className='democrat' style={demBar}>&nbsp;</div>
					<div className='independent' style={indBar}>&nbsp;</div>
					<div className='undecided'   style={undecidedBar}>&nbsp;</div>
					<div className='republican'  style={gopBar}>&nbsp;</div>
				</div>
				<div className='labels'>
					<div className='democrat'>{demSeats} D</div>
					<div className='republican'>{gopSeats} R</div>
				</div>
				<div className='change'>
					<div className='democrat'>{demChange}</div>
					<div className='republican'>{gopChange}</div>
				</div>
				<div className='key'>
					{undecidedKey}
					{independentKey}
				</div>
			</div>
		);
	}

});

module.exports = BalanceOfPower;