/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var CandidateSummary = require('./CandidateSummary.jsx');
var Precincts        = require('./Precincts.jsx');
var Party            = require('./CandidateParty.jsx');

var util             = require('../assets/js/util.js');

var CandidatesTable = React.createClass({

	getInitialState: function() {
		return {
			hasBars: false,
			hasPhotos: false
		};
	},

	render: function() {

		var self = this;

		var candidateSummaries = null;
		var reportingUnit = this.props.reportingUnit;
		var candidates = this.props.candidates;
		var isBallot = this.props.isBallot;
		var isLite = this.props.isLite;
		var isPrimary = this.props.isPrimary;
		var precincts = null;

		// <CandidateSummary /> needs the total number of votes
		// so that we can calculate pct. reporting
		var totalVotes = _.chain(reportingUnit.results)
			.pluck('vote_count')
			.reduce(function(a, b) { return a + b; })
			.value();

		var hasIncumbent = _.find(reportingUnit.results, {incumbent: true});

		var isUncontested = candidates.length < 2;

		// next, sort results by vote_count desc
		candidateSummaries = _.chain(reportingUnit.results)
			.sortBy(function(result) {
				// sort rows by vote_count descending
				return -result.vote_count;
			})
			.map(function(result) {

				// find this result's candidate
				var candidate = _.find(candidates, {id:result.ap_candidate_id});

				// extend result with candidate information
				var extendedResult = _.extend({}, result, candidate);

				var components = [];

				// don't display party if it's ballot, or lite, or primary
				if (!(isBallot || isLite || isPrimary)) {
					components.push(<Party
						key={'party' + extendedResult.id}
						candidate={extendedResult}
						candidates={candidates}
						isLite={isLite}
						race={self.props.race}
						hasPhoto={self.state.hasPhotos}
					/>);
				}

				components.push(<CandidateSummary
					key={'candidate' + extendedResult.id}
					candidate={extendedResult}
					candidates={candidates}
					isBallot={isBallot}
					isPrimary={isPrimary}
					isLite={isLite}
					totalVotes={totalVotes}
				/>);

				return components;
			})
			.flatten()
			.value();

		precincts = (
			<Precincts reportingUnit={reportingUnit} hasIncumbent={hasIncumbent} isLite={isLite} />
		);

		var theadRows;
		var singleTheadRow = this.state.hasPhotos ? <th className='candidate-photo'></th> : null;

		if (isUncontested) {
			theadRows = <tr>
				{singleTheadRow}
				<th className='candidate-name'></th>
				<th className='candidate-uncontested'></th>
			</tr>;
		} else {
			if (isLite) {
				theadRows = <tr>
					<th className='candidate-name'></th>
					<th className='candidate-votes'></th>
				</tr>;
			} else {
				theadRows = <tr>
					{singleTheadRow}
					<th className='candidate-name'></th>
					<th className='candidate-percent'></th>
					<th className='candidate-bar'></th>
					<th className='candidate-votes'></th>
				</tr>;
			}
		}

		var cx = React.addons.classSet;
		var classes = cx({
			'candidates-table': true,
			'has-photos': this.state.hasPhotos,
			'has-bars': this.state.hasBars
		});

		return (
			<table className={classes}>
				<thead>
					{theadRows}
				</thead>
				{precincts}
				<tbody>
					{candidateSummaries}
				</tbody>
			</table>
		);
	},

	componentDidMount: function() {
		var self = this;
		function resize() {
			var node = self.getDOMNode();
			var width = node.offsetWidth;
			self.setState({
				hasBars: width >= 360,
				hasPhotos: width >= 480
			});
		}
		window.addEventListener('resize', _.debounce(function() {
			resize();
		}, 150));
		resize();
	}

});

module.exports = CandidatesTable;