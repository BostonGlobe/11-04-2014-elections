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

var OfficesResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = [this.props.office, this.props.state, this.props.date].join('');
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/' + this.props.state + '/' + this.props.office + '?date=' + this.props.date;
		return url;
	},

	render: function() {

		var self = this;

		var summaries = _.chain(this.state.results)
			.map(function(race) {

				var name = util.seatName(race);

				var augmentedRace = {
					race: race,
					name: name
				};

				// extract number
				var regex = /(\d*)(th|st|nd|rd) (.*)/;
				var match = regex.exec(name);
				var number;

				augmentedRace.number = match ? +match[1] : -1;
				augmentedRace.rest = match ? match[3] : name;

				return augmentedRace;
			})
			.sortBy(function(augmentedRace) {
				return augmentedRace.number;
			})
			.sortBy(function(augmentedRace) {
				return augmentedRace.rest;
			})
			.map(function(augmentedRace) {

				var name = augmentedRace.name;
				var race = augmentedRace.race;
				var moment = Moment(race.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				var isUncontested = race.candidates.length < 2;

				var url = '/news/politics/election-results/' + displayDate + '/race/' + race.state_postal + '/' + race.office_name + '/' + race.seat_name;

				var button = !isUncontested ? <a href={url}><button className='go-to-full-results'>Go to full results</button></a> : null;

				return (
					<div className='office' key={race.race_number}>
						<Title name={name} />
						<Summary results={race} />
						{button}
						<div className='election-related-story'>
							<span className='election-related-overline'>More governor coverage</span>
							<a href=''>Related election headline goes here just like this</a>
						</div>
					</div>
				);
			})
			.value();

		var title = this.state.results[0] ? <Title isHeader={true} name={util.officeTitle(this.state.results[0])} /> : null;

		return (
			<div className='offices-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				{title}
				<ShareTools />
				{_.first(summaries)}
				<Ad />
				{_.rest(summaries)}
			</div>
		);
	}

});

module.exports = OfficesResults;