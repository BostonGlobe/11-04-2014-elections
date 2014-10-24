/**
 * @jsx React.DOM
 */

var React = require('react');

var util  = require('../assets/js/util.js');

var RaceName = React.createClass({

	statics: {

		format: function(race) {

			var display = '';

			if (race) {

				var date = Date(race.election_date);

				var primary = race.race_type === 'Primary' ? race.race_type_id + ' primary' : null;

				var name = _.chain([race.state_postal, race.office_name, race.seat_name, primary])
					.filter(function(v) {
						return v;
					})
					.value()
					.join(' - ');

				display = name;
			}

			return display;
		}

	},

	render: function() {

		return (
			<div className='race-name'>{RaceName.format(this.props.race)}</div>
		);
	}

});

module.exports = RaceName;