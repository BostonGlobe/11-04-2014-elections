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
// casino is 24698
// governor primary is 22796

var node = document.querySelector('#elections-detailedresults');

React.renderComponent(
	<DetailedResults
		state={node.getAttribute('data-state')}
		office={node.getAttribute('data-office')}
		seat={node.getAttribute('data-seat')} />,
	node
);