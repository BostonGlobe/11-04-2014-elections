/**
 * @jsx React.DOM
 */

var React = require('react');

var RaceName = React.createClass({

	statics: {

		format: function(race) {

			var display = '';

			if (race) {
				var name = _.chain([race.office_name, race.seat_name])
					.filter(function(v) {
						return v.length;
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