/**
 * @jsx React.DOM
 */

var React = require('react');

var CandidateSummary = require('./CandidateSummary.jsx');

var util = require('../assets/js/util.js');

var Summary = React.createClass({

	updateWidths: function() {

		// this assumes each summary has multiple blocks like this:
		// <div class='candidate-summary'>
		// 	<div class='candidate-party'></div>
		// 	<div class='candidate-name'></div>
		// 	<div class='candidate-percent'></div>
		// 	<div class='candidate-votes'></div>
		// </div>

		function normalizeContainers(selector, context) {

			// reset widths
			$(selector, context).css('width', '');

			// get max width
			var maxWidth = _.max($(selector, context).map(function() {
				return $(this).width();
			}).get());

			// now give it to all elements
			$(selector, context).width(maxWidth);

			return maxWidth;
		}

		// var nameWidth = normalizeContainers('.candidate-name', this.getDOMNode());
		// // var percentWidth = normalizeContainers('.candidate-percent', this.getDOMNode());
		// var votesWidth = normalizeContainers('.candidate-votes', this.getDOMNode());





		// assign percent the rest of the width
		// $('.candidate-votes', this.getDOMNode()).width()

	},

	render: function() {

		var candidateSummaries = null;
		var results = this.props.results;

		if (results) {

			var isBallot = results.race_type === 'Ballot Issue';

			// we're only interested in the top-level results
			var reportingUnit = _.find(results.reporting_units, {fips_code: 0});

			// <CandidateSummary /> needs the total number of votes
			// so that we can calculate pct. reporting
			var totalVotes = _.chain(reportingUnit.results)
				.pluck('vote_count')
				.reduce(function(a, b) { return a + b; })
				.value();

			// we'll also need the list of candidates
			var candidates = results.candidates;

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
					var extendedResult = _.extend(result, candidate);

					return (
						<CandidateSummary candidate={extendedResult} key={extendedResult.id} totalVotes={totalVotes} isBallot={isBallot} />
					);
				})
				.value();
		}

		return (
			<div className='summary'>
				<table>
					{candidateSummaries}
				</table>
			</div>
		);
	},

	componentDidMount: function() {
		// on viewport resize, maintain svg aspect
		var self = this;
		window.addEventListener('resize', _.debounce(function() {
			self.updateWidths();
		}, 150));
	},

	componentDidUpdate: function() {
		this.updateWidths();
	}

});

module.exports = Summary;