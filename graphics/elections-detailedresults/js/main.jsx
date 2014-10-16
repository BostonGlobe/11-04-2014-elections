/**
 * @jsx React.DOM
 */

var React = require('react');
var DetailedResults = require('../../../common/containers/DetailedResults.jsx');

// governor is 22957
// 1st Essex is 22091
// 6th district is 22044
// 5th Suffolk is 23098
// something up north is 22014

React.renderComponent(
	<DetailedResults choices={[22796]} />,
	document.getElementById('elections-detailedresults')
);