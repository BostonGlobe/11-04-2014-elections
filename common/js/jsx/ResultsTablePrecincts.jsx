/**
 * @jsx React.DOM
 */
var ResultsTablePrecincts = React.createClass({
	render: function() {
		return (
			<tr>
				<td colSpan="100%">
					<span>{this.props.precincts}</span>
				</td>
			</tr>
		);
	}
});