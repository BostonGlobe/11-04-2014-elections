/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock         = require('../components/PollClock.jsx');
var Donut         = require('../components/Donut.jsx');


var util              = require('../assets/js/util.js');

var Strip = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = 'MAGovernor20141104';
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/MA/Governor/?date=20141104';
		return url;
	},

	render: function() {

		var results = this.state.results[0];
		util.log(this.state);

		var fancies = results ? _.chain(results.reporting_units[0].results)
			.map(function(result) {

				var party = util.partyAbbreviationToParty(result.party);

				return <div className={party} key={result.ap_candidate_id}>
					<div>Gabriel</div>
					<Donut percent={50} />
				</div>;
			})
			.value() : null;

		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={true ? this.fetchResults : 'a'} />
				{fancies}
			</div>
		);
	}

});

module.exports = Strip;