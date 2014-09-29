/**
 * @jsx React.DOM
 */

// this one doesn't poll. meaning, it receives its data from a parent.
// in other words, its data is not state.

var React = require('react');

var RaceName = React.createClass({

	render: function() {
		return (
			<div>{this.props.race.office_name}</div>
		);
	}

});

module.exports = RaceName;