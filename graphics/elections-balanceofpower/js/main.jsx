/**
 * @jsx React.DOM
 */

var React = require('react');
var BalanceOfPowerResults = require('../../../common/containers/BalanceOfPowerResults.jsx');

var nodes = document.querySelectorAll('.elections-balanceofpower');

for (var i = 0; nodes[i]; i++) {

	var node = nodes[i];
	var offices = node.getAttribute('data-offices').split(',');

	React.renderComponent(
		<BalanceOfPowerResults raceNumbers={offices} />,
		node
	);
}