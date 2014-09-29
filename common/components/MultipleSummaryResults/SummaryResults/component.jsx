/**
 * @jsx React.DOM
 */

var React = require('react');
var RaceName = require('./RaceName.jsx');
var SummaryTable = require('./SummaryTable/component.jsx');

var SummaryResults = React.createClass({

	render: function() {
		return (
			<div className='summary-results'>
				<RaceName race={this.props.race} />
				<SummaryTable race={this.props.race} />
			</div>
		);
	}

});

module.exports = SummaryResults;