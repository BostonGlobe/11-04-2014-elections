/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var CandidateParty = React.createClass({

	render: function() {

		var component = null;

		var party = util.partyAbbreviationToParty(this.props.candidate.party) || 'independent';

		return (
			<tr>
				<td className='candidate-party' colSpan='100%'>
					<span className={'square ' + party}>&#9632;</span>
					<span className='party'>{party}</span>
				</td>
			</tr>
		);
	}

});

module.exports = CandidateParty;