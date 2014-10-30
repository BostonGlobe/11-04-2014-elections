/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');

var PollClock         = require('../components/PollClock.jsx');
var ShareTools        = require('../components/ShareTools.jsx');
var Summary           = require('../components/Summary.jsx');
var Title             = require('../components/Title.jsx');
var Ad                = require('../components/Ad.jsx');

var util              = require('../assets/js/util.js');
var Moment            = require('moment');

var TownResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = [this.props.town, this.props.state, this.props.date].join('').replace(/ /g, '').replace(/-/g, '');
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/town/' + encodeURIComponent(this.props.town) + '?state=' + encodeURIComponent(this.props.state) + '&date=' + this.props.date;
		return url;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.map(function(race) {

				var moment = Moment(race.election_date);
				var displayDate = moment.format('YYYY-MM-DD');

				var url = '/news/politics/election-results/' + displayDate + '/race/' + race.state_postal + '/' + race.office_name + '/' + race.seat_name;

				return (
					<div className='town' key={race.race_number}>
						<Title name={util.raceName(race)} />
						<Summary results={race} />
						<a href='{url}'><button className='go-to-full-results'>Go to full results</button></a>
					</div>
				);
			})
			.value();

		return (
			<div className='town-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Title isHeader={true} name={[this.props.date, this.props.town, this.props.state].join(', ')} />
				<ShareTools />
				{_.first(summaries)}
				<Ad />
				{_.rest(summaries)}
			</div>
		);
	}

});

module.exports = TownResults;