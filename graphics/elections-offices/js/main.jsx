/**
 * @jsx React.DOM
 */

var React = require('react');
var OfficesResults = require('../../../common/containers/OfficesResults.jsx');

var node = document.querySelector('#elections-offices');

React.renderComponent(
	<OfficesResults
		date={node.getAttribute('data-date')}
		office={node.getAttribute('data-office')}
		state={node.getAttribute('data-state')} />,
	node
);