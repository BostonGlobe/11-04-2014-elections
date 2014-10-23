/**
 * @jsx React.DOM
 */

var React = require('react');

var util  = require('../assets/js/util.js');

var CandidateBar = React.createClass({

	render: function() {

		var party = util.partyAbbreviationToParty(this.props.candidate.party) || 'independent';

		var totalVotes = this.props.totalVotes;
		var voteCount = this.props.candidate.vote_count;

		var pct = totalVotes > 0 ?
			util.formatPercent(voteCount/totalVotes, 1) :
			0;

		var style = {
			width: pct + '%'
		};

		return (
			<td className='candidate-bar'>
				<span className='bar'>
					<span style={style} className={'fill ' + party}>&nbsp;</span>
				</span>
			</td>
		);
	}

});

module.exports = CandidateBar;