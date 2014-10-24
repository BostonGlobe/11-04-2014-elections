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
		return false;
	},

	render: function() {

		var powers = _.chain(this.state.results)
			.map(function(results, index) {
				return <BalanceOfPower results={results} key={index} />;
			})
			.value();

		return (
			<div className='balance-of-power-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{powers}
			</div>
		);
	}

});

module.exports = BalanceOfPowerResults;