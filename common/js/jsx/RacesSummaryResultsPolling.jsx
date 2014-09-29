/**
 * @jsx React.DOM
 */

var React = require('react');

var RacesSummaryResultsPolling = React.createClass({

	render: function() {
		return (
			<div>{this.props.raceNumbers}</div>
		);
	}

});

module.exports = RacesSummaryResultsPolling;