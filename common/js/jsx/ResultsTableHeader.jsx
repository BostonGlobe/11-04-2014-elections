/**
 * @jsx React.DOM
 */
var ResultsTableHeader = React.createClass({
	render: function() {

		// if this is a primary, the left-column title should be the party
		var title = '';

		switch (this.props.race.race_type) {
			case 'Primary':
				title = globe.electionsUtil.formatRaceTypeID(this.props.race.race_type_id);
			break;
		}

		return (
			<tr>
				<th>{title}</th>
				<th>Votes</th>
				<th>Pct.</th>
			</tr>
		);
	}
});