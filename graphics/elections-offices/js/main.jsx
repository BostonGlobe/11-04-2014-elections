/**
 * @jsx React.DOM
 */

var React = require('react');
var OfficesResults = require('../../../common/containers/OfficesResults.jsx');

React.renderComponent(
	<OfficesResults office={'State Senate'} state={'MA'} />,
	document.getElementById('elections-offices')
);