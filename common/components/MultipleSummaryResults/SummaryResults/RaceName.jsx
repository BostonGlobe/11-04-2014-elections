/**
 * @jsx React.DOM
 */

var React = require('react');
var Race = require('../../objects/Race.js');

var RaceName = React.createClass({

	render: function() {

		return (
			<h2 className='race-name story-title'>{Race.getName(this.props.race)}</h2>
		);
	}

});

module.exports = RaceName;