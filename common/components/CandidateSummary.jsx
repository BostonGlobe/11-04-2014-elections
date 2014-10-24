/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Name    = require('./CandidateName.jsx');
var Percent = require('./CandidatePercent.jsx');
var Votes   = require('./CandidateVotes.jsx');
var Bar     = require('./CandidateBar.jsx');

var CandidateSummary = React.createClass({

	render: function() {

		var isLite = this.props.isLite;
		var isBallot = this.props.isBallot;
		var isPrimary = this.props.isPrimary;
		var candidate = this.props.candidate;
		var candidates = this.props.candidates;
		var totalVotes = this.props.totalVotes;

		var cx = React.addons.classSet;

		var classes = cx({
			'candidate-summary': true,
			'add-top-space': isLite || isBallot || isPrimary
		});

		var votes = !isLite ? <Votes candidate={candidate} /> : null;

		var bar = !isLite ? <Bar
			candidate={candidate}
			candidates={candidates}
			totalVotes={totalVotes}
			isBallot={isBallot}
			isPrimary={isPrimary}
		/> : null;

		return (
			<tr className={classes}>
				<Name
					candidate={candidate}
					isLite={candidate}
				/>
				<Percent
					candidate={candidate}
					totalVotes={totalVotes}
				/>
				{bar}
				{votes}
			</tr>
		);
	}

});

module.exports = CandidateSummary;