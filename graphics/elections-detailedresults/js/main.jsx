/**
 * @jsx React.DOM
 */

var React = require('react');
var DetailedResults = require('../../../common/components/DetailedResults/component.jsx');

React.renderComponent(
	<DetailedResults choices={[22044]} />,
	document.getElementById('elections-detailedresults')
);