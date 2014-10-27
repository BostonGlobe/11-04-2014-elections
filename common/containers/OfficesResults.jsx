/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var PollClock         = require('../components/PollClock.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');
var RaceName          = require('../components/RaceName.jsx');

var util              = require('../assets/js/util.js');

var OfficesResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = [this.props.office, this.props.state].join('').replace(' ', '');
		util.log(callback);
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = true;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/offices?office_name=' + encodeURIComponent(this.props.office) + '&state_postal=' + encodeURIComponent(this.props.state);
		util.log(url);
		return url;
	},

	allResultsAreIn: function() {
		return false;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.sortBy(function(race) {
				return race.seat_name;
			})
			.map(function(race) {
				return (
					<div className='office' key={race.race_number}>
						<RaceName name={race.seat_name} race={race} />
						<Summary results={race} />
						<button>Go to full results</button>
					</div>
				);
			})
			.value();

		return (
			<div className='offices-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<RaceName name={[this.props.state, this.props.office].join(' ')} />
				<ShareTools />
				{summaries}
			</div>
		);
	}

});

module.exports = OfficesResults;