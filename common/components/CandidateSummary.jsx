/**
 * @jsx React.DOM
 */

var React = require('react');

var Party   = require('./CandidateParty.jsx');
var Name    = require('./CandidateName.jsx');
var Percent = require('./CandidatePercent.jsx');
var Votes   = require('./CandidateVotes.jsx');

// 	<Party candidate={this.props.candidate} isBallot={this.props.isBallot} />

var CandidateSummary = React.createClass({

	render: function() {
		return (
			<tr className='candidate-summary'>
				<Name candidate={this.props.candidate} />
				<Percent candidate={this.props.candidate} totalVotes={this.props.totalVotes} />
				<Votes candidate={this.props.candidate} />
			</tr>
		);
	}

});

module.exports = CandidateSummary;