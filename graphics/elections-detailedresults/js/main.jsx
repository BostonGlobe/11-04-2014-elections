/**
 * @jsx React.DOM
 */

var React = require('react');
var MultipleBalanceOfPowerResults = require('../../../common/components/MultipleBalanceOfPowerResults/component.jsx');

React.renderComponent(
	<MultipleBalanceOfPowerResults choices={['US House']} />,
	document.getElementById('elections-detailedresults')
);