/**
 * @jsx React.DOM
 */

var React = require('react');

var Party   = require('./CandidateParty.jsx');
var Name    = require('./CandidateName.jsx');
var Percent = require('./CandidatePercent.jsx');
var Votes   = require('./CandidateVotes.jsx');

					// <Percent candidate={this.props.candidate} totalVotes={this.props.totalVotes} />


var CandidateSummary = React.createClass({

	render: function() {
		return (
			<div className='candidate-summary'>
				<Party candidate={this.props.candidate} isBallot={this.props.isBallot} />
				<div className='details'>
					<Name candidate={this.props.candidate} />
					<Votes candidate={this.props.candidate} />
				</div>
			</div>
		);
	}

});

module.exports = CandidateSummary;