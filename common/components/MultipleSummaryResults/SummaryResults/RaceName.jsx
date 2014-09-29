/**
 * @jsx React.DOM
 */

var React = require('react');

var RaceName = React.createClass({

	render: function() {
		return (
			<div className='race-name'>{this.props.race.office_name}</div>
		);
	}

});

module.exports = RaceName;