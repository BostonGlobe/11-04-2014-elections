/**
 * @jsx React.DOM
 */

var React = require('react');

var Row = React.createClass({

	render: function() {
		return (
			<tr>
				<td>one</td>
				<td>two</td>
				<td>three</td>
			</tr>
		);
	}

});

module.exports = Row;