/**
 * @jsx React.DOM
 */
var ResultsTableHeader = React.createClass({
	render: function() {
		return (
			<tr>
				<th>Candidate</th>
				<th>Votes</th>
				<th>Pct.</th>
			</tr>
		);
	}
});