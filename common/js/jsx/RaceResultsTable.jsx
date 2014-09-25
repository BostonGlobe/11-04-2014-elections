/**
 * @jsx React.DOM
 */
var RaceResultsTable = React.createClass({
	render: function() {
		var rows = this.props.race.results.map(function(result) {
			return (
				<ResultsTableRow result={result} key={result.name} />
			);
		});

		return (
			<div className="raceResultsTable">
				<table>
					<thead>
						<ResultsTableHeader />
					</thead>
					<tfoot>
						<ResultsTablePrecincts precincts={this.props.race.precincts} />
					</tfoot>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
});

