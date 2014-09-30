/**
 * @jsx React.DOM
 */

var React = require('react');
var util = require('../../../../../common/js/util.js');

var Row = React.createClass({

	render: function() {

		var totalVotes = this.props.totalVotes;
		var voteCount = this.props.result.vote_count;

		var pct = totalVotes > 0 ?
			util.formatPercent(voteCount/totalVotes, 1) :
			0;

		var votesForDisplay = util.numberWithCommas(voteCount);

		var isWinner = this.props.result.winner === 'X';

		var className = [this.props.className, isWinner ? 'winner' : ''].join(' ');

		var name = this.props.result.last_name;

		return (
			<tr className={className}>
				<td className='name'><span className='square'></span>{name}</td>
				<td className='votes'>{votesForDisplay}</td>
				<td className='pct'>{pct}<span className='pct-sign'>%</span></td>
			</tr>
		);
	}

});

module.exports = Row;