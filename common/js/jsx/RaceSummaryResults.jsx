/**
 * @jsx React.DOM
 */

var React = require('react');
var RaceName = require('./RaceName.jsx');

var RaceSummaryResults = React.createClass({

	render: function() {
		return (
			<RaceName race={this.props.race} />
		);
	}

});

module.exports = RaceSummaryResults;