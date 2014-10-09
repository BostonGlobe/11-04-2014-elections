/**
 * @jsx React.DOM
 */

// for the time being, this component isn't responsible for fetching the topojson.
// it expects to receive it immediately.

var React = require('react');
var d3 = require('d3');
var topojson = require('topojson');

var Choropleth = React.createClass({

	aspect: 0,

	render: function() {
		return (
			<div className='choropleth'>
				<svg></svg>
			</div>
		);
	},

	updateContainerDimensions: function() {

// debugger;
// 		var self = $('svg', this.getDOMNode());

// 		var targetWidth = self.parent().width();

// 		self.attr('width', targetWidth);
// 		self.attr('height', targetWidth / aspect);
	},

	componentDidMount: function() {

		var shapefile = this.props.shapefile;

		// window.addEventListener('resize', this.updateContainerDimensions);

		var feature = topojson.feature(shapefile, shapefile.objects.TOWNS);

		// we'll center the map on the centroid
		var centroid = d3.geo.centroid(feature);

		// Create a unit projection.
		var projection = d3.geo.albers()
			.center([0, centroid[1]])
			.rotate([-centroid[0], 0])
			.scale(1)
			.translate([0, 0]);

		// Create a path generator.
		var path = d3.geo.path()
			.projection(projection);

		// Compute the bounds of a feature of interest.
		var b = path.bounds(feature);

		// we'll use the aspect to update container dimensions
		// we wouldn't need to do this were it not for safari
		// because chrome obeys svg viewport
		this.aspect = (b[1][0]-b[0][0])/(b[1][1]-b[0][1]);

		var width = 1000;
		var height = width/this.aspect;

		var s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
		var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		// Update the projection to use computed scale & translate.
		projection
			.scale(s)
			.translate(t);

		// get this svg element
		var svg = this.getDOMNode().querySelector('svg');

		// create the choropleth
		d3.select(svg)
			.attr({
				viewBox: [0, 0, width, height].join(' '),
				preserveAspectRatio: 'xMidYMid'
			})
			.append('path')
			.datum(feature)
			.attr('d', path);

		// // force 
		// this.updateContainerDimensions();
	},

	shouldComponentUpdate: function(props, state) {

		// // do we already have a topojson?
		// if (this.props.topojson) {

		// } else {
		// 	// no! so create the map
		// 	// this.props.topojson = props;

		// }
		return false;
	}

});

module.exports = Choropleth;