/**
 * @jsx React.DOM
 */

/**
 *  +  SummaryResults
 *     {1} RaceName
 *      +  SummaryTable
 *         {1} Header
 *          +  Row
 *         {1} Precincts
 */

var React = require('react');
var RaceName = require('./RaceName.jsx');

var SummaryResults = React.createClass({

	render: function() {
		return (
			<div className='summary-results'>
				<RaceName race={this.props.race} />
			</div>
		);
	}

});

module.exports = SummaryResults;