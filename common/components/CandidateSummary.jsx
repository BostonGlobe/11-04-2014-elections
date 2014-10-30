/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Name        = require('./CandidateName.jsx');
var Percent     = require('./CandidatePercent.jsx');
var Votes       = require('./CandidateVotes.jsx');
var Bar         = require('./CandidateBar.jsx');
var Uncontested = require('./CandidateUncontested.jsx');

var CandidateSummary = React.createClass({

	render: function() {

		var isLite = this.props.isLite;
		var isBallot = this.props.isBallot;
		var isPrimary = this.props.isPrimary;
		var candidate = this.props.candidate;
		var candidates = this.props.candidates;
		var totalVotes = this.props.totalVotes;

		var isUncontested = candidates.length < 2;

		var cx = React.addons.classSet;

		var classes = cx({
			'candidate-summary': true,
			'add-top-space': isLite || isBallot || isPrimary
		});

		var votes = !isLite && !isUncontested ? <Votes candidate={candidate} /> : null;

		var bar = !isLite && !isUncontested ? <Bar
			candidate={candidate}
			candidates={candidates}
			totalVotes={totalVotes}
			isBallot={isBallot}
			isPrimary={isPrimary}
		/> : null;

		var percent = !isUncontested ? <Percent
			candidate={candidate}
			totalVotes={totalVotes} /> : null;

		var uncontested = isUncontested ? <Uncontested /> : null;

		return (
			<tr className={classes}>
				<Name
					candidate={candidate}
					isLite={isLite}
				/>
				{percent}
				{bar}
				{votes}
				{uncontested}
			</tr>
		);
	}

});

module.exports = CandidateSummary;