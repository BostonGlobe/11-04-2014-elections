/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Name    = require('./CandidateName.jsx');
var Percent = require('./CandidatePercent.jsx');
var Votes   = require('./CandidateVotes.jsx');

var CandidateSummary = React.createClass({

	render: function() {

		var cx = React.addons.classSet;
		var isLite = this.props.isLite;

		var classes = cx({
			'candidate-summary': true,
			'add-top-space': isLite || this.props.isBallot
		});

		var votes = !isLite ? <Votes candidate={this.props.candidate} /> : null;

		return (
			<tr className={classes}>
				<Name candidate={this.props.candidate} />
				<Percent candidate={this.props.candidate} totalVotes={this.props.totalVotes} />
				{votes}
			</tr>
		);
	}

});

module.exports = CandidateSummary;