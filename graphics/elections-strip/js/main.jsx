/**
 * @jsx React.DOM
 */

var React = require('react');
var Strip = require('../../../common/containers/Strip.jsx');

React.renderComponent(
	<Strip />,
	document.querySelector('#elections-strip')
);

var knob = require('./libs/knob/knob.js');