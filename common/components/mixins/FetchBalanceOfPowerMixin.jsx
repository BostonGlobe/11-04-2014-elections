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
		var json = [{
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

		// make sure that we're only showing chosen offices
		// the choices are passed in as this.props.offices
		// e.g. this.props.offices = ['house', 'senate']
		var chosenOffices = _.map(this.props.offices, function(choice) {
			return choice.toLowerCase().trim();
		});

		var offices = _.chain(json)
			.map(function(office) {
				// replace U.S. with US, to fit with Globe style
				office.office = office.office.replace('U.S.', 'US');
				return office;
			})
			.filter(function(office) {
				// only show chosen offices
				return _.contains(chosenOffices, office.office.toLowerCase());
			})
			.sortBy(function(office) {
				// we can't rely on the server's ordering,
				// so revert back to the given ordering
				// as found in this.props.offices
				return _.indexOf(chosenOffices, office.office.toLowerCase());
			})
			.value();

		this.setState({offices: offices});
	},
	getInitialState: function() {
		return {offices: []};
	},
	// this runs after render, which is when we check if all results are in
	componentDidUpdate: function() {

		if (this.allResultsAreIn(this.state.offices)) {

			this.refs.thePollClock.stop();

		} else {

			// resume the pollclock
			this.refs.thePollClock.resume();

		}
	},
	allResultsAreIn: function(offices) {

		// are there any races with undecided NOT 0?
		var undecidedRaces = _.filter(offices, function(office) {
			return office.undecided > 0;
		});

		return !undecidedRaces.length;
	}
};

module.exports = FetchBalanceOfPowerMixin;











