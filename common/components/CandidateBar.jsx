/**
 * @jsx React.DOM
 */

var React = require('react');

var util  = require('../assets/js/util.js');

var CandidateBar = React.createClass({

	render: function() {

		var isBallot = this.props.isBallot;
		var isPrimary = this.props.isPrimary;
		var candidate = this.props.candidate;
		var candidates = this.props.candidates;
		var totalVotes = this.props.totalVotes;

		var color = util.getColor({
			isBallot: isBallot,
			isPrimary: isPrimary,
			candidate: candidate,
			candidates: candidates
		});

		var voteCount = candidate.vote_count;

		var pct = totalVotes > 0 ?
			util.formatPercent(voteCount/totalVotes, 1) :
			0;

		var style = {
			width: pct + '%',
			background: color
		};

		return (
			<td className='candidate-bar'>
				<span className='bar'>
					<span style={style} className='fill'>&nbsp;</span>
				</span>
			</td>
		);
	}

});

module.exports = CandidateBar;