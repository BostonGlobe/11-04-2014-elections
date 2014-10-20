/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var CandidatePercent = React.createClass({

	render: function() {

		var totalVotes = this.props.totalVotes;
		var voteCount = this.props.candidate.vote_count;

		var pct = totalVotes > 0 ?
			util.formatPercent(voteCount/totalVotes, 1) :
			0;

		return (
			<div className='candidate-percent'>
				<span className='percent'>{pct}%</span>
			</div>
		);
	}

});

module.exports = CandidatePercent;