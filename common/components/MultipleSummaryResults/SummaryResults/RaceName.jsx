/**
 * @jsx React.DOM
 */

var React = require('react');

var RaceName = React.createClass({

	render: function() {
		return (
			<h2 className='race-name story-title'>{this.props.race.office_name}</h2>
		);
	}

});

module.exports = RaceName;