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
		var isDev = false;

		var url = 'http://' + (isDev ? 'localhost:8080/' : 'devweb.bostonglobe.com/') + 'electionapi/races/office/' + encodeURIComponent(this.props.office) + '/?date=20141104&state=' + encodeURIComponent(this.props.state);
		util.log(url);
		return url;
	},

	allResultsAreIn: function() {
		return false;
	},

	render: function() {

		var summaries = _.chain(this.state.results)
			.map(function(race) {

				// seat_name e.g. 2ndBristol&Plymouth
				// extract ordinal
				var regex = /^(\d*(th|st|nd|rd))?(.*)/;
				var match = regex.exec(race.seat_name);

				var ordinal = match[1];

				// now let's work on the towns
				var towns = match[3]
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
						ordinal: ordinal,
						towns: townsForDisplay
					}
				};
			})
			.sortBy(function(augmentedRace) {
				return augmentedRace.ordinalAndTowns.ordinal;
			})
			.sortBy(function(augmentedRace) {
				return augmentedRace.ordinalAndTowns.towns;
			})
			.map(function(augmentedRace) {

				var race = augmentedRace.race;
				var ordinalAndTowns = augmentedRace.ordinalAndTowns;

				return (
					<div className='office' key={race.race_number}>
						<RaceName name={[ordinalAndTowns.ordinal, ordinalAndTowns.towns].join(' ').trim()} race={race} />
						<Summary results={race} />
						<button className='go-to-full-results'>Go to full results</button>
					</div>
				);
			})
			.value();

		return (
			<div className='offices-results'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<RaceName isHeader={true} name={[this.props.state, this.props.office].join(' ')} />
				<ShareTools />
				{summaries}
			</div>
		);
	}

});

module.exports = OfficesResults;