/**
 * @jsx React.DOM
 */

var React = require('react');
var TownResults = require('../../../common/containers/TownResults.jsx');

React.renderComponent(
	<TownResults town={'Henniker'} state={'NH'} />,
	document.getElementById('elections-town')
);