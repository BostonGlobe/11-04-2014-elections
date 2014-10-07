/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchBalanceOfPowerMixin = require('../mixins/FetchBalanceOfPowerMixin.jsx');
var PollClock = require('../PollClock.jsx');
var BalanceOfPower = require('./BalanceOfPower/component.jsx');

var MultipleBalanceOfPowerResults = React.createClass({

	mixins: [FetchBalanceOfPowerMixin],

	render: function() {

		var multipleBalanceOfPowers = _.map(this.state.offices, function(office) {

			return (
				<BalanceOfPower office={office} key={office.office} />
			);

		});

		return (
			<div className='multiple-balance-of-power-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchData} />
				{multipleBalanceOfPowers}
			</div>
		);
	}

});

module.exports = MultipleBalanceOfPowerResults;