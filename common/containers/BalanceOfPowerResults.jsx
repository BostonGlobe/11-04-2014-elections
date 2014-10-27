/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var PollClock         = require('../components/PollClock.jsx');
var RaceName          = require('../components/RaceName.jsx');
var BalanceOfPower    = require('../components/BalanceOfPower.jsx');

var util              = require('../assets/js/util.js');

var BalanceOfPowerResults = React.createClass({

	mixins: [FetchResultsMixin],

	apiUrl: function() {
		return 'http://private.boston.com/multimedia/graphics/projectFiles/2014/11/electionsapi/balanceofpower.jsonp';
	},

	// FetchResultsMixin needs this
	apiCallback: function() {
		return 'balanceofpower';
	},

	allResultsAreIn: function() {

		var allResultsAreIn = _.chain(this.state.results)
			.map(BalanceOfPower.convertFeedToResults)
			.pluck('Others')
			.pluck('WonHoldovers')
			.every(function(v) {
				return v === 0;
			})
			.value();

		return allResultsAreIn;
	},

	sortByDefault: function(results, ordering) {

		var choices = ordering.map(function(s) {
			return s.trim();
		});

		var sorted = _.chain(results)
			.filter(function(result) {
				var name = BalanceOfPower.getNameFromFeed(result);
				return _.contains(choices, name);
			})
			.sortBy(function(result) {
				var name = BalanceOfPower.getNameFromFeed(result);
				return _.indexOf(choices, name);
			})
			.value();

		return sorted;
	},

	render: function() {

		var powers = _.map(this.state.results, function(results, index) {
			return <BalanceOfPower results={results} key={index} />;
		});

		return (
			<div className='balance-of-power-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{powers}
			</div>
		);
	}

});

module.exports = BalanceOfPowerResults;