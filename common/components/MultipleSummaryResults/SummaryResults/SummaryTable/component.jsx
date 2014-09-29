/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./Header.jsx');
var Row = require('./Row.jsx');
var Precincts = require('./Precincts.jsx');

var SummaryTable = React.createClass({

	render: function() {
		return (
			<div className='summary-table'>
				<Header />
				<Row />
				<Precincts />
			</div>
		);
	}

});

module.exports = SummaryTable;