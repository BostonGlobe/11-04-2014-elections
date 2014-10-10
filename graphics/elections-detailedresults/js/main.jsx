/**
 * @jsx React.DOM
 */

var React = require('react');
var DetailedResults = require('../../../common/components/DetailedResults/component.jsx');

// governor is 22957
// 1st Essex is 22091

React.renderComponent(
	<DetailedResults choices={[22044]} />,
	document.getElementById('elections-detailedresults')
);