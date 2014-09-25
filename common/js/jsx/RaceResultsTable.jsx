/**
 * @jsx React.DOM
 */
var RaceResultsTable = React.createClass({
	render: function() {
		// var rows = this.props.race.results.map(function(result) {
		// 	return (
		// 		<ResultsTableRow result={result} key={result.name} />
		// 	);
		// });

		return (
			<table>
				<thead>
					<ResultsTableHeader />
				</thead>
				<tfoot>
				</tfoot>
				<tbody>
				</tbody>
			</table>
		);
	}
});


					// <ResultsTablePrecincts precincts={this.props.race.precincts} />
					// {rows}
