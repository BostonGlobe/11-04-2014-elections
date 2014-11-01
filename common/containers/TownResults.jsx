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
	apiUrl: function() {
		return '/races/town/' + this.props.town + '?state=' + this.props.state + '&date=' + this.props.date;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.filter(function(race) {
				return race.seat_name && race.seat_name.length;
			})
			.sortBy(function(race) {
				return [race.office_name, race.seat_name].join(' ');
			})
			.map(function(race) {

				var moment = Moment(race.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				var isUncontested = race.candidates.length < 2;

				var url = '/news/politics/election-results/' + displayDate + '/race/' + race.state_postal + '/' + race.office_name + '/' + race.seat_name;

				var button = !isUncontested ? <a href={url}><button className='go-to-full-results'>Go to full results</button></a> : null;

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
				<ShareTools />
				{_.first(summaries)}
				<Ad />
				{_.rest(summaries)}
			</div>
		);
	}

});

module.exports = TownResults;