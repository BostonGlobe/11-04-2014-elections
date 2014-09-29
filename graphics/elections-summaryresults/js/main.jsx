/**
 * @jsx React.DOM
 */

var React = require('react');
var MultipleSummaryResults = require('../../../common/components/MultipleSummaryResults/main.jsx');

var nodes = document.querySelectorAll('.elections-summaryresults');

function stringToNumbers(s) {
	return s.split(',')
		.map(function(value) {
			return +value;
		});
}

for (var i = 0; nodes[i]; i++) {

	var node = nodes[i];
	var raceNumbers = stringToNumbers(node.getAttribute('data-racenumbers'));

	React.renderComponent(
		<MultipleSummaryResults raceNumbers={raceNumbers} />,
		node
	);
}