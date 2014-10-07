/**
 * @jsx React.DOM
 */

var React = require('react');
var BalanceOfPowerResults = require('../../../common/components/BalanceOfPowerResults/component.jsx');

var nodes = document.querySelectorAll('.elections-balanceofpower');

for (var i = 0; nodes[i]; i++) {

	var node = nodes[i];

	React.renderComponent(
		<BalanceOfPowerResults />,
		node
	);
}