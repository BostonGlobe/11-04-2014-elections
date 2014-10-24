/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var CandidateParty = React.createClass({

	render: function() {

		var candidate = this.props.candidate;
		var candidates = this.props.candidates;

		var color = util.getColor({
			candidate: candidate,
			candidates: candidates
		});

		var component = null;

		var party = util.partyAbbreviationToParty(candidate.party) || 'independent';

		var style = {
			color: color
		};

		return (
			<tr>
				<td className='candidate-party' colSpan='100%'>
					<span className='square' style={style}>&#9632;</span>
					<span className='party'>{party}</span>
				</td>
			</tr>
		);
	}

});

module.exports = CandidateParty;