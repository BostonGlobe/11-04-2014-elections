/**
 * @jsx React.DOM
 */

// for the time being, this component isn't responsible for fetching the topojson.
// it expects to receive it immediately.

var React    = require('react');
var d3       = require('d3');
var topojson = require('topojson');

var d3util   = require('../assets/js/d3util.js');
var util     = require('../assets/js/util.js');

var Choropleth = React.createClass({

	statics: {

		pointIsLeftOfCenter: function(opts) {

			var point = opts.point;
			var feature = opts.feature;

			var mapBounds = d3.geo.bounds(feature);
			var x0 = mapBounds[0][0];
			var x1 = mapBounds[1][0];
			var dx = x1 - x0;
			var cx = x0 + dx/2;

			return point[0] > cx;
		},

		getViewBoxDimensions: function(svg) {

			var dimensions = null;

			// get aspect directly from svg
			var viewBoxAttribute = svg.getAttribute('viewBox');

			if (viewBoxAttribute) {
				var viewBox = viewBoxAttribute.split(' ');

				dimensions = {
					width: +viewBox[2],
					height: +viewBox[3]
				};
			}

			return dimensions;
		},

		// this gets called on viewport resize. it resizes the svg container.
		updateSvgDimensions: function(svgs) {
			
			var self = this;

			// force scrollbar just in case we need it
			// otherwise the targetWidth will be off
			$('body').height(10000);

			svgs.each(function() {

				var dimensions = self.getViewBoxDimensions(this);

				if (dimensions) {
					var aspect = dimensions.width/dimensions.height;

					var targetWidth = $(this).parent().width();

					$(this).attr('width', targetWidth);
					$(this).attr('height', targetWidth / aspect);
				}

			});

			// reset scrollbar
			$('body').height('auto');
		},

		updateFullMap: function(opts) {

			var self = this;

			var results = opts.results;
			var node = opts.node;
			var path = opts.path;
			var tooltipCallback = opts.tooltipCallback;
			// opts.features;

			var features = [];

			// bind results to shapefile
			if (results && results.reporting_units) {

				results.reporting_units.forEach(function(reporting_unit) {

					var match = _.find(opts.features, function(feature) {
						return reporting_unit.county_name.toUpperCase() === feature.properties.REPORTING_UNIT;
					});

					if (match) {
						match.properties.reporting_unit = reporting_unit;
						features.push(match);
					}

				});

			}

			var g = node;

			function selectNode(self) {
				d3.select(self).classed('active', true);
				d3util.moveToFront.call(self);
			}

			g.selectAll('path')
				// update
					.data(features, function(d) {
						return d.properties.REPORTING_UNIT;
					})
					.style('fill', function(d) {
						return Choropleth.chooseFillColor(d, results);
					})
				// enter
				.enter().append('path')
					.style('fill', function(d) {
						return Choropleth.chooseFillColor(d, results);
					})
					.attr('d', path)
					.on('mousemove', function(d) {

						// find selected paths
						var actives = this.parentNode.querySelectorAll('.active');
						d3.selectAll(actives).classed('active', false);

						var svg = $(this).parents('svg').get(0);

						var dimensions = self.getViewBoxDimensions(svg);
						var mouse = d3.mouse(this);

						var position = {
							x: 100 * mouse[0]/dimensions.width,
							y: 100 * mouse[1]/dimensions.height,
						};

						tooltipCallback({
							reportingUnit: d.properties.reporting_unit,
							coordinates: position
						});
						selectNode(this);
					})
					.on('mouseout', function() {

						tooltipCallback({
							reportingUnit: null
						});
						d3.select(this).classed('active', false);
					});
				},

		drawOutlines: function(opts) {

			var svg = opts.svg;
			var path = opts.path;
			var allTownsOutline = opts.allTownsOutline;
			var raceTownsOutline = opts.raceTownsOutline;

			if (allTownsOutline) {
				// create the master region outline
				svg.append('path')
					.datum(allTownsOutline)
					.attr({
						'd': path,
						'class': 'all-towns-outline'
					});
			}

			if (raceTownsOutline) {
				// create the region outline
				svg.append('path')
					.datum(raceTownsOutline)
					.attr({
						'd': path,
						'class': 'race-towns-outline'
					});
			}
		},

		createGeometryObjects: function(results, shapefile) {

			var allTowns = topojson.feature(shapefile, shapefile.objects.REPORTING_UNITS);
			var allTownsOutline = topojson.merge(shapefile, shapefile.objects.REPORTING_UNITS.geometries);

			var townsInRace = _.chain(results.reporting_units)
				.pluck('county_name')
				.map(function(county_name) {
					return county_name.toUpperCase();
				})
				.value();

			function filterDelegate(d) {
				return _.contains(townsInRace, d.properties.REPORTING_UNIT);
			}

			// TODO: get rid of duplication
			var raceTowns = topojson.feature(shapefile, shapefile.objects.REPORTING_UNITS).features.filter(filterDelegate);
			var raceTownsOutline = topojson.merge(shapefile, shapefile.objects.REPORTING_UNITS.geometries.filter(filterDelegate));

			return {
				allTowns: allTowns,
				raceTowns: raceTowns,
				raceTownsOutline: raceTownsOutline,
				allTownsOutline: allTownsOutline
			};
		},

		createSvgAndPath: function(opts) {

			var feature = opts.feature;
			var node = opts.node;

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
				.projection(projection)
				.pointRadius(10);

			// Compute the bounds of a feature of interest.
			var b = path.bounds(feature);

			// we'll use the aspect to update container dimensions
			// we wouldn't need to do this were it not for safari
			// because chrome obeys svg viewport
			var aspect = (b[1][0]-b[0][0])/(b[1][1]-b[0][1]);

			// Use normalized width and height. Don't worry!
			// this doesn't mean the final width will be 1000px.
			// this is simply used for svg's preserveAspectRatio.
			var width = 1000;
			var height = Math.round(width/aspect);

			// Compute scale and translate.
			var s = 0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
			var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

			// Update the projection to use computed scale & translate.
			projection
				.scale(s)
				.translate(t);

			// get this svg element
			var svg = d3.select(node);

			// create the container
			svg.attr({
				viewBox: [0, 0, width, height].join(' '),
				preserveAspectRatio: 'xMidYMid'
			});

			return {
				svg: svg,
				path: path,
				projection: projection
			};
		},

		// this function returns a string, e.g. 'inrace-nowinner-novotes Dem' which
		// will be used to color a town
		// the function gets called for every town, and every time there's new data
		chooseFillColor: function(d, race) {

			var reportingUnit = d.properties.reporting_unit;

			var color = 'white';

			if (reportingUnit) {

				// sort results by vote_count, descending
				var results = _.sortBy(reportingUnit.results, function(result) {
					return -result.vote_count;
				});

				// do we have a winner?
				var thereIsAWinner = _.some(results, {winner: 'X'});

				// do we have any votes?
				var thereAreVotes = _.first(results).vote_count > 0;

				// is there a tie?
				var thereIsATie = _.first(results).vote_count === _.last(results).vote_count && thereAreVotes;

				// is this a primary?
				var isPrimary = race.race_type === 'Primary';

				// is this a ballot question?
				var isBallot = race.race_type === 'Ballot Issue';

				// get the leading candidate
				var candidate = _.first(results);

				if (thereAreVotes) {
	
					if (thereIsATie) {

						color = 'rgba(221, 222, 224, 1)';

					} else {

						// TODO: take into account leading vs winner
						color = util.getColor({
							isBallot: isBallot,
							isPrimary: isPrimary,
							candidate: candidate,
							candidates: race.candidates
						});

					}

				}

			}

			return color;
		}

	},

	geometryObjects: null,

	// used to draw choropleth paths
	path: null,

	render: function() {

		return (
			<div className='choropleth'>
				<div className='fullmap'>
					<svg></svg>
				</div>
				<div className='minimap'>
					<svg></svg>
				</div>
			</div>
		);
	},

	// this is part of the react lifecycle, so it's ok
	// if we refer to this.variables
	// but nothing else should.
	shouldComponentUpdate: function(props, state) {

		var self = this;

		// is this the first time we get results?
		// if so, draw the map
		if (!self.props.results && props.results) {

			// first, create and set geometry objects as class variable
			self.geometryObjects = Choropleth.createGeometryObjects(props.results, self.props.shapefile);

			var isStatewideRace = props.results.reporting_units.length === self.geometryObjects.allTowns.features.length + 1;

			// next, create the full map svg container
			// and save the svg and path, since we'll need them for later
			var fullMapSvgAndPath = Choropleth.createSvgAndPath({
				feature: self.geometryObjects.raceTownsOutline,
				node: self.getDOMNode().querySelector('.fullmap svg')
			});

			// create the features container - draw it first,
			// so that the outlines will be drawn above
			fullMapSvgAndPath.svg.append('g').attr('class', 'features');

			// save the path - we'll need it every time we update the map with new data
			// TODO: maybe it shouldn't be called just 'path'
			self.path = fullMapSvgAndPath.path;

			// next, draw the full map outlines
			// for now, let's just draw the race towns outline
			Choropleth.drawOutlines({
				svg: fullMapSvgAndPath.svg,
				path: self.path,
				raceTownsOutline: self.geometryObjects.raceTownsOutline
			});

			if (!isStatewideRace) {

				// next, draw the full map label and text
				// first, find the town with most population
				var largestTown = _.chain(self.geometryObjects.raceTowns)
					.sortBy(function(town) {
						return -town.properties.POPULATION;
					})
					.first()
					.value();

				var labels = fullMapSvgAndPath.svg.append('g').attr('class', 'labels');

				labels.append('line')
					.datum(largestTown)
					.attr({
						transform: function(d) {
							var coordinates = fullMapSvgAndPath.projection(d3.geo.centroid(d));
							return "translate(" + coordinates + ")";
						}
					});

				labels.append('text')
					.datum(largestTown)
					.attr({
						transform: function(d) {
							var coordinates = fullMapSvgAndPath.projection(d3.geo.centroid(d));
							return "translate(" + coordinates + ")";
						},
						x: function(d) {
							return Choropleth.pointIsLeftOfCenter({point: d3.geo.centroid(d), feature: self.geometryObjects.raceTownsOutline}) ? -15 : 15;
						},
						dy: '0.3em'
					})
					.text(function(d) {
						return d.properties.REPORTING_UNIT.toLowerCase();
					})
					.style('text-anchor', function(d) {
						return Choropleth.pointIsLeftOfCenter({point: d3.geo.centroid(d), feature: self.geometryObjects.raceTownsOutline}) ? 'end' : 'start';
					});


				// next, create the mini map svg container
				var miniMapSvgAndPath = Choropleth.createSvgAndPath({
					feature: self.geometryObjects.allTownsOutline,
					node: self.getDOMNode().querySelector('.minimap svg')
				});

				// next, draw the mini map outlines
				Choropleth.drawOutlines({
					svg: miniMapSvgAndPath.svg,
					path: miniMapSvgAndPath.path,
					allTownsOutline: self.geometryObjects.allTownsOutline,
					raceTownsOutline: self.geometryObjects.raceTownsOutline
				});

				$(self.getDOMNode().querySelector('.minimap')).show();

			} else {
				$(self.getDOMNode().querySelector('.minimap')).hide();
			}

			// on viewport resize, maintain svg aspect
			window.addEventListener('resize', _.debounce(function() {
				var node = self.getDOMNode();
				Choropleth.updateSvgDimensions($('svg', node));
			}, 150));
			Choropleth.updateSvgDimensions($('svg', self.getDOMNode()));
		}

		// next is the part where we draw the data
		if (props.results && self.geometryObjects.raceTowns) {

			var node = d3.select(self.getDOMNode().querySelector('.fullmap svg g.features'));

			Choropleth.updateFullMap({
				results: props.results,
				features: self.geometryObjects.raceTowns,
				node: node,
				path: self.path,
				tooltipCallback: self.props.tooltipCallback
			});

		}

		return false;
	}
});

module.exports = Choropleth;