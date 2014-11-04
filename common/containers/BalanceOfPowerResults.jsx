/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var PollClock         = require('../components/PollClock.jsx');
var Title             = require('../components/Title.jsx');
var BalanceOfPower    = require('../components/BalanceOfPower.jsx');

var util              = require('../assets/js/util.js');

var BalanceOfPowerResults = React.createClass({

	mixins: [FetchResultsMixin],

	apiUrl: function() {
		return '/trends';
	},

	processJson: function(json) {

		var data = json.map(function(v) {
			return JSON.parse(v);
		});

		var results = data.map(BalanceOfPower.transformResults);

		return results;
	},

	allResultsAreIn: function(results) {

		var allResultsAreIn = _.chain(results)
			.pluck('parties')
			.flatten()
			.pluck('Leading')
			.every(0)
			.value();

		return allResultsAreIn;
	},

	sortByDefault: function(results, ordering) {

		var choices = ordering.map(function(s) {
			return s.trim();
		});

		var sorted = _.chain(results)
			.filter(function(result) {
				return _.contains(choices, result.name);
			})
			.sortBy(function(result) {
				return _.indexOf(choices, result.name);
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