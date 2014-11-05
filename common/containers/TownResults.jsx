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
var FullResultsButton = require('../components/FullResultsButton.jsx');

var util              = require('../assets/js/util.js');
var Moment            = require('moment');

var TownResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		return '/races/town/' + this.props.town + '?state=' + this.props.state + '&date=' + this.props.date;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.reject(function(race) {
				return race.office_name === 'Question';
			})
			.filter(function(race) {
				return race.seat_name && race.seat_name.length;
			})
			.sortBy(function(race) {
				return [race.alternate_office_name, race.seat_name].join(' ');
			})
			.map(function(race) {

				var moment = Moment(race.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				var isUncontested = race.candidates.length < 2;

				var url = '/news/politics/election-results/' + displayDate + '/race/' + race.state_postal + '/' + race.alternate_office_name + '/' + race.seat_name + '?p1=BG_elections_race_results';

				var button = !isUncontested ? <FullResultsButton url={url} /> : null;

				return (
					<div className='town' key={race.race_number}>
						<Title name={util.raceName(race)} />
						<Summary results={race} />
						{button}
					</div>
				);
			})
			.value();

		return (
			<div className='town-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Title isHeader={true} name={util.townTitle({town:this.props.town, state:this.props.state})} />
				{_.first(summaries)}
				<Ad />
				{_.rest(summaries)}
			</div>
		);
	}

});

module.exports = TownResults;

				// <ShareTools />
