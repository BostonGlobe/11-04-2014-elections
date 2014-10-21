/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var CandidateParty = React.createClass({

	render: function() {

		var component = null;

		// if this is a ballot, don't return anything
		if (!this.props.isBallot) {

			var party = util.partyAbbreviationToParty(this.props.candidate.party) || 'independent';

			component = (
				<tr>
					<td className='candidate-party' colSpan='100%'>
						<span className={'square ' + party}>&#9632;</span>
						<span className='party'>{party}</span>
					</td>
				</tr>
			);

		}

		return component;
	}

});

module.exports = CandidateParty;