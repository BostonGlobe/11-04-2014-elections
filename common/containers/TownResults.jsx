/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var PollClock         = require('../components/PollClock.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');
var Title             = require('../components/Title.jsx');

var util              = require('../assets/js/util.js');

var TownResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = [this.props.town, this.props.state].join('').replace(' ', '');
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/town/' + encodeURIComponent(this.props.town) + '?state=' + encodeURIComponent(this.props.state);
		return url;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.map(function(race) {

				return (
					<div className='town' key={race.race_number}>
						<Title name={util.raceName(race)} />
						<Summary results={race} />
						<button className='go-to-full-results'>Go to full results</button>
					</div>
				);
			})
			.value();

		return (
			<div className='town-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Title isHeader={true} name={[this.props.town, this.props.state].join(', ')} />
				<ShareTools />
				{summaries}
			</div>
		);
	}

});

module.exports = TownResults;