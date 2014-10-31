/**
 * @jsx React.DOM
 */

var React = require('react');

var Donut = React.createClass({

	render: function() {

		return (
			<div className='donut'>
				{this.props.percent}
			</div>
		);
	}

});

module.exports = Donut;