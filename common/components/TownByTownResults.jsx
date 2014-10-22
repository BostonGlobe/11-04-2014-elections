/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateTh = React.createClass({
	render: function() {

		var first = this.props.isFirst ? <div>Votes</div> : null;

		return (
			<th>
				<div>{this.props.candidate.last_name}</div>
				{first}
			</th>
		);
	}
});

var CandidateTd = React.createClass({
	render: function() {
		return (
			<td>
				<div>87%</div>
				<div>55,423</div>
			</td>
		);
	}
});

var TownTr = React.createClass({
	render: function() {

		return (
			<tr>
				<td>
					<div>{this.props.name}</div>
					<div>{this.props.precinctsReporting} of {this.props.totalPrecincts}</div>
				</td>
				<CandidateTd />
				<CandidateTd />
			</tr>
		);
	}
});

var TownByTownResults = React.createClass({

	render: function() {

		var component = null;
		var results = this.props.results;

		if (results) {

			var before = Date.now();

			var candidates = results.candidates;

			var summaryReportingUnit = _.find(results.reporting_units, {'fips_code': 0});
			var summaryReportingUnitCandidates = _.sortBy(summaryReportingUnit.results, function(result) {
				return -result.vote_count;
			});

			var candidateThs = _.chain(summaryReportingUnitCandidates)
				.map(function(result, index) {

					// find this result's candidate
					var candidate = _.find(candidates, {id:result.ap_candidate_id});

					// extend result with candidate information
					var extendedResult = _.extend({}, result, candidate);

					return <CandidateTh
						candidate={extendedResult} 
						isFirst={index === 0}
						key={extendedResult.id} />;
				})
				.value();

			var townTrs = _.chain(results.reporting_units)
				.first(2)
				.sortBy('county_name')
				.map(function(reporting_unit) {

					var name = reporting_unit.county_name;

					return <TownTr
						name={name}
						key={name}
						precinctsReporting={reporting_unit.precincts_reporting}
						totalPrecincts={reporting_unit.total_precincts}
					/>;
				})
				.value();

			var after = Date.now();
			console.log('rendering town-by-town-results took ' + (after - before) + ' ms');

			component = (
				<div className='town-by-town-results'>
					<table>
						<thead>
							<tr>
								<th>
									<div>City/Town</div>
									<div>Pcts. reporting</div>
								</th>
								{candidateThs}
							</tr>
						</thead>
						<tbody>
							{townTrs}
						</tbody>
					</table>
					<pre>{JSON.stringify(this.props.results, null, 4)}</pre>
				</div>
			);
		}

		return component;
	}

});

module.exports = TownByTownResults;