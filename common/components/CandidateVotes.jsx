/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');

var CandidateVotes = React.createClass({

	render: function() {

		var votesForDisplay = util.numberWithCommas(this.props.candidate.vote_count);

		return (
			<td className='candidate-votes'>
				<span className='votes'>{votesForDisplay} votes</span>
			</td>
		);
	}

});

module.exports = CandidateVotes;