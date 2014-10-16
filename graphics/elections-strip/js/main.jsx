/**
 * @jsx React.DOM
 */

var React = require('react');
var Strip = require('../../../common/containers/Strip.jsx');

var nodes = document.querySelectorAll('.elections-strip');

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
	var raceNumber = [+node.getAttribute('data-racenumber')];
	var candidateNumbers = stringToNumbers(node.getAttribute('data-candidatenumbers'));

	React.renderComponent(
		<Strip choices={raceNumber} candidateNumbers={candidateNumbers} />,
		node
	);
}