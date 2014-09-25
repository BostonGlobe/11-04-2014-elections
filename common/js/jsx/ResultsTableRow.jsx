/**
 * @jsx React.DOM
 */
var ResultsTableRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.result.name}</td>
				<td>{this.props.result.votes}</td>
				<td>{this.props.result.pct}</td>
			</tr>
		);
	}
});