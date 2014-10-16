/**
 * @jsx React.DOM
 */

/**
 * This is the header for a summary results table.
 * It is quite likely we'll need a different header
 * for another table, eg. one with a town per row.
 * The summary results table has one candidate per row.
 */

var React = require('react');
var util = require('../../../../js/util.js');

var Header = React.createClass({

	statics: {

		getTitle: function(race) {
			var title = race.race_type === 'Primary' ?
				util.raceTypeIDToParty(race.race_type_id) :
				'';

			return title;
		}
	},

	render: function() {
		var title = Header.getTitle(this.props.race);

		return (
			<thead>
				<tr>
					<th className={'name ' + title}>{title}</th>
					<th className='votes'>Votes</th>
					<th className='pct'>Pct.</th>
				</tr>
			</thead>
		);
	}

});

module.exports = Header;