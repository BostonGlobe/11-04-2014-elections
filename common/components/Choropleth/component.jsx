/**
 * @jsx React.DOM
 */

var React = require('react');
var d3 = require('d3');
var topojson = require('topojson');
var towns = require('../../../data/output/towns.json');

var Choropleth = React.createClass({

	render: function() {
		return (
			<svg className='choropleth'></svg>
		);
	},

	componentDidMount: function() {
		d3.select(this.getDOMNode())
			.attr({
				width: 500,
				height: 500
			});
	},

	shouldComponentUpdate: function(props) {
		return false;
	}

});

module.exports = Choropleth;