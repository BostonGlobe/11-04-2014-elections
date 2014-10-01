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
				{this.props.displayTitle ? <RaceName race={this.props.race} /> : null}
				<SummaryTable race={this.props.race} hasGraphic={this.props.hasGraphic} />
			</div>
		);
	}

});

module.exports = SummaryResults;