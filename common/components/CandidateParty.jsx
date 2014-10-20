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
				<div className='candidate-party'>
					<span className='square'>&nbsp;</span>
					<span className='party'>{party}</span>
				</div>
			);

		}

		return component;
	}

});

module.exports = CandidateParty;