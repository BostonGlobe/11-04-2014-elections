/**
 * @jsx React.DOM
 */

// this assumes the existence of a dom element
// with data-offices attribute

// this also assumes the existence of this.refs.thePollClock

var React = require('react');

var FetchBalanceOfPowerMixin = {
	fetchData: function() {
		// eventually, make an ajax jsonp call here.
		var offices = [{
			office: 'U.S. House',
			democrats: 20+0, // sum of Dem Won+Holdovers
			republicans:19+0, // sum of GOP Won+Holdovers
			undecided: 392, // sum of Dem Leading and GOP Leading
			democratsChange: 0, // Dem Net Change
			republicansChange: 0  // GOP Net Change
		},{
			office: 'U.S. Senate',
			democrats: 34, // sum of Dem Won+Holdovers
			republicans: 32, // sum of GOP Won+Holdovers
			undecided: 32, // sum of Dem Leading and GOP Leading
			democratsChange: -1, // Dem Net Change
			republicansChange: 1  // GOP Net Change
		},{
			office: 'Governor',
			democrats: 9, // sum of Dem Won+Holdovers
			republicans: 8, // sum of GOP Won+Holdovers
			undecided: 33, // sum of Dem Leading and GOP Leading
			democratsChange: -1, // Dem Net Change
			republicansChange: 1  // GOP Net Change
		}];

		this.setState({offices: offices});
	},
	getInitialState: function() {
		return {offices: []};
	},
	// this runs after render, which is when we check if all results are in
	componentDidUpdate: function() {
		this.refs.thePollClock.resume();
		// if (this.)		
	},
	allResultsAreIn: function() {

	}
};

module.exports = FetchBalanceOfPowerMixin;