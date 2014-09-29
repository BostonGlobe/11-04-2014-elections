/**
 * @jsx React.DOM
 */

var React = require('react');
var RaceName = require('./RaceName.jsx');
var RaceSummaryTable = require('./RaceSummaryTable.jsx');

var RaceSummaryResults = React.createClass({

	render: function() {
		return (
			<div>
				<RaceName race={this.props.race} />
				<RaceSummaryTable race={this.props.race} />
			</div>
		);
	}

});

module.exports = RaceSummaryResults;