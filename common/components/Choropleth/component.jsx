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
		
		var self = $('svg', this.getDOMNode());

		// force scrollbar just in case we need it
		// otherwise the targetWidth will be off
		$('body').height(10000);

		var targetWidth = self.parent().width();

		self.attr('width', targetWidth);
		self.attr('height', targetWidth / this.aspect);

		// reset scrollbar
		$('body').height('auto');
	},

	componentDidMount: function() {

		var shapefile = this.props.shapefile;

		// TODO: change name of TOWNS to something more generic.
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

		// Use normalized width and height. Don't worry!
		// this doesn't mean the final width will be 1000px.
		// this is simply used for svg's preserveAspectRatio.
		var width = 1000;
		var height = Math.round(width/this.aspect);

		// Compute scale and translate.
		var s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
		var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		// Update the projection to use computed scale & translate.
		projection
			.scale(s)
			.translate(t);

		// get this svg element
		var svg = d3.select(this.getDOMNode().querySelector('svg'));

		// create the container
		svg.attr({
			viewBox: [0, 0, width, height].join(' '),
			preserveAspectRatio: 'xMidYMid'
		});

		// create the outline
		// TODO: is this the best way of drawing the outline?
		svg.append('path')
			.datum(topojson.mesh(shapefile, shapefile.objects.TOWNS, function(a, b) {
				return a === b;
			}))
			.attr({
				'd': path,
				'class': 'outline'
			});


			// .append('path')
			// .datum(feature)
			// .attr('d', path);





		// next is the part where we draw the data

		window.addEventListener('resize', _.debounce(this.updateContainerDimensions, 150));
		this.updateContainerDimensions();
	},

	shouldComponentUpdate: function(props, state) {

		// next is the part where we draw the data

		return false;
	}

});

module.exports = Choropleth;