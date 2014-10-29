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

var OfficesResults = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiCallback: function() {
		var callback = [this.props.office, this.props.state, this.props.date].join('').replace(/ /g, '').replace(/-/g, '');
		return callback;
	},

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = false;
		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/' + this.props.state + '/' + encodeURIComponent(this.props.office) + '?date=' + this.props.date;
		return url;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.map(function(race) {

				// seat_name e.g. 2ndBristol&Plymouth
				// extract ordinal
				var regex = /^((\d*)(th|st|nd|rd))?(.*)/;
				var match = regex.exec(race.seat_name);

				// now let's work on the towns
				var towns = _.last(match)
					.trim() // remove start and end whitespace
					.replace(/,/g, '&') // replace all commas with &
					.replace(/ /g, '') // remove all whitespace
					.split('&'); // create an array of towns

				var townsForDisplay = towns.length === 1 ?
					towns[0] :
					[_.initial(towns).join(', '), _.last(towns)].join(' & ');

				return {
					race: race,
					ordinalAndTowns: {
						number: match[2], 
						ordinal: match[3],
						towns: townsForDisplay
					}
				};
			})
			.sortBy(function(augmentedRace) {
				return +augmentedRace.ordinalAndTowns.number;
			})
			.sortBy(function(augmentedRace) {
				return augmentedRace.ordinalAndTowns.towns;
			})
			.map(function(augmentedRace) {

				var race = augmentedRace.race;
				var ordinalAndTowns = augmentedRace.ordinalAndTowns;

				return (
					<div className='office' key={race.race_number}>
						<Title name={ordinalAndTowns.towns} number={ordinalAndTowns.number} ordinal={ordinalAndTowns.ordinal} />
						<Summary results={race} />
						<button className='go-to-full-results'>Go to full results</button>
					</div>
				);
			})
			.value();

		return (
			<div className='offices-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<Title isHeader={true} name={[this.props.date, this.props.state, this.props.office].join(' ')} />
				<ShareTools />
				{_.first(summaries)}
				<Ad />
				{_.rest(summaries)}
			</div>
		);
	}

});

module.exports = OfficesResults;