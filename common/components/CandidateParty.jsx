/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidatePhoto = require('./CandidatePhoto.jsx');

var util = require('../assets/js/util.js');

var CandidateParty = React.createClass({

	render: function() {

		var candidate = this.props.candidate;
		var candidates = this.props.candidates;
		var race = this.props.race;

		var color = util.getColor({
			candidate: candidate,
			candidates: candidates
		});

		var component = null;

		var party = util.partyAbbreviationToParty(candidate.party) || 'independent';

		var photoExists = CandidatePhoto.exists({
			alternate_office_name: race.alternate_office_name,
			seat_name: race.seat_name,
			state_postal: race.state_postal,
			election_date: race.election_date,
			candidate: candidate
		});

		var photo = !this.props.isLite && photoExists && this.props.hasPhoto ? <CandidatePhoto candidate={candidate} race={race} /> : null;

		return (
			<tr>
				{photo}
				<td className='candidate-party'>
					<span className='party'>{party}</span>
				</td>
			</tr>
		);
	}

});

module.exports = CandidateParty;