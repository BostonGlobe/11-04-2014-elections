/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchBalanceOfPowerMixin = require('../mixins/FetchBalanceOfPowerMixin.jsx');
var PollClock = require('../PollClock.jsx');
var BalanceOfPower = require('./BalanceOfPower/component.jsx');

var MultipleBalanceOfPowerResults = React.createClass({

	mixins: [FetchBalanceOfPowerMixin],

	// from http://stackoverflow.com/a/19014495/64372
	updateStyling: function() {
		var width = $(this.getDOMNode()).width();

		// from http://stackoverflow.com/a/584953/64372
		var roundedDownWidth = 100 * Math.floor((width) / 100);
		this.setState({minWidth: roundedDownWidth});
	},

	componentDidMount: function() {
		this.updateStyling();
		window.addEventListener('resize', this.updateStyling);
	},

	getInitialState: function() {
		return {minWidth: 0};
	},

	render: function() {

		var minWidth = this.state.minWidth;

		var multipleBalanceOfPowers = _.map(this.state.offices, function(office) {

			return (
				<BalanceOfPower minWidth={minWidth} office={office} key={office.office} />
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