/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateUncontested = React.createClass({

	render: function() {
		return (
			<td className='candidate-uncontested'>
				<span className='uncontested'>
					Uncontested
				</span>
			</td>
		);
	}

});

module.exports = CandidateUncontested;