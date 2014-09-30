/**
 * @jsx React.DOM
 */

var React = require('react');
var util = require('../../../../../common/js/util.js');

var Row = React.createClass({

	render: function() {

		var pct = this.props.totalVotes > 0 ?
			util.formatPercent(this.props.result.vote_count/this.props.totalVotes, 1) :
			0;

		var votes = util.numberWithCommas(this.props.result.vote_count);

		return (
			<tr>
				<td className='name'>{this.props.result.last_name}</td>
				<td className='votes'>{votes}</td>
				<td className='pct'>{pct}%</td>
			</tr>
		);
	}

});

module.exports = Row;