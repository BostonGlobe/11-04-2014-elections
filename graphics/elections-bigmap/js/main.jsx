/**
 * @jsx React.DOM
 */

var React = require('react');
var BigMap = require('../../../common/containers/BigMap.jsx');

var node = document.querySelector('#elections-bigmap');

React.renderComponent(
	<BigMap
		state={node.getAttribute('data-state')}
		date={node.getAttribute('data-date')}
		office={node.getAttribute('data-office')}
		seat={node.getAttribute('data-seat')} />,
	node
);