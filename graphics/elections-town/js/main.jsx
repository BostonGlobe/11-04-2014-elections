/**
 * @jsx React.DOM
 */

var React = require('react');
var TownResults = require('../../../common/containers/TownResults.jsx');

var node = document.querySelector('#elections-town');

React.renderComponent(
	<TownResults
		date={node.getAttribute('data-date')}
		town={node.getAttribute('data-town')}
		state={node.getAttribute('data-state')} />,
	node
);