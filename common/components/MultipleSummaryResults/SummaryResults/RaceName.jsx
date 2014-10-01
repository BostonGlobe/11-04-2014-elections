/**
 * @jsx React.DOM
 */

var React = require('react');

var RaceName = React.createClass({

	statics: {
		getName: function(race) {

			var name = _.chain([race.office_name, race.seat_name])
				.filter(function(v) {
					return v.length;
				})
				.value()
				.join(' - ');

			return name;
		}
	},

	render: function() {
		return (
			<h2 className='race-name story-title'>{RaceName.getName(this.props.race)}</h2>
		);
	}

});

module.exports = RaceName;