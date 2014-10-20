/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateName = React.createClass({

	render: function() {

		var winner = this.props.candidate.winner === 'X' ?
			<span className='winner'>✔</span> : null;

		var candidate = this.props.candidate;

		var incumbent = this.props.candidate.incumbent ?
			<span className='incumbent'>i</span> : null;

		return (
			<td className='candidate-name'>
				{winner}
				<span className='name'>{candidate.last_name}</span>
				{incumbent}
			</td>
		);
	}

});

module.exports = CandidateName;