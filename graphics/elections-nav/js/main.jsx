/**
 * @jsx React.DOM
 */

var React = require('react');
var ElectionNav = require('../../../common/containers/ElectionNav.jsx');

React.renderComponent(
	<ElectionNav />,
	document.getElementById('elections-nav')
);