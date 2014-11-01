/**
 * @jsx React.DOM
 */

var React = require('react');
var SummaryResults = require('../../../common/containers/SummaryResults.jsx');

var nodes = document.querySelectorAll('.elections-summaryresults');

function stringToNumbers(s) {

	return _.chain(s.split(','))
		.map(function(value) {
			return +value;
		})
		.uniq()
		.value();
}

for (var i = 0; nodes[i]; i++) {

	var node = nodes[i];
	var state = node.getAttribute('data-state');
	var date = node.getAttribute('data-date');
	var raceNumbers = stringToNumbers(node.getAttribute('data-racenumbers'));

	React.renderComponent(
		<SummaryResults state={state} date={date} raceNumbers={raceNumbers} />,
		node
	);
}