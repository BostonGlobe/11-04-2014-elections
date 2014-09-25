/**
 * @jsx React.DOM
 */
var RaceResults = React.createClass({
	render: function() {
		return (
			<div className="raceResults">
				<RaceName name={this.props.race.name} />
				<RaceResultsTable race={this.props.race} />
			</div>
		);
	}
});