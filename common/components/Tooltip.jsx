/**
 * @jsx React.DOM
 */

var React   = require('react');

var Summary = require('./Summary.jsx');
// CandidateSummary
// Precincts
					// {precincts}
					// 	{candidateSummaries}
				// <table className='summary'>
				// 	<thead>
				// 		<tr>
				// 			<th></th>
				// 			<th></th>
				// 			<th></th>
				// 		</tr>
				// 	</thead>
				// 	<tbody>
				// 	</tbody>
				// </table>

var Tooltip = React.createClass({

	render: function() {

		return (
			<div className='tooltip'>
				<pre>{JSON.stringify(this.props.reportingUnit, null, 4)}</pre>
				<pre>{JSON.stringify(this.props.candidates, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = Tooltip;