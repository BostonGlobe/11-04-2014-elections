/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock = require('../PollClock.jsx');

var BalanceOfPower = require('./BalanceOfPower/component.jsx');

var MultipleBalanceOfPowerResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		return 'http://private.boston.com/multimedia/graphics/projectFiles/2014/11/electionsapi/balanceofpower.jsonp';
	},

	// FetchResultsMixin needs this
	apiCallback: function() {
		return 'balanceofpower';
	},

	// FetchResultsMixin needs this
	allResultsAreIn: function(results) {

		// are there any races with undecided NOT 0?
		var undecidedRaces = _.filter(results, function(office) {
			return office.undecided > 0;
		});

		return !undecidedRaces.length;
	},

	// FetchResultsMixin needs this
	sortByDefault: function(results, ordering) {
		// make sure that we're only showing chosen offices
		// the choices are passed in as this.props.offices
		// e.g. this.props.offices = ['house', 'senate']
		var chosenOffices = _.map(ordering, function(choice) {
			return choice.toLowerCase().trim();
		});

		var offices = _.chain(results)
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

		return offices;
	},

	// the following three functions are all related
	// they help style the container by looking at the container
	// width instead of the viewport with
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

		var multipleBalanceOfPowers = _.map(this.state.results, function(office) {

			return (
				<BalanceOfPower minWidth={minWidth} office={office} key={office.office} />
			);

		});

		return (
			<div className='multiple-balance-of-power-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{multipleBalanceOfPowers}
			</div>
		);
	}

});

module.exports = MultipleBalanceOfPowerResults;