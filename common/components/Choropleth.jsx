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
			var before = Date.now();
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

			var after = Date.now();
			console.log('binding results to shapefile took ' + (after - before) + 'ms');

			var g = node;

			function select(self) {
				d3.select(self).classed('active', true);
				d3util.moveToFront.call(self);
			}

			function deselect(self) {
				d3.select(self).classed('active', false);
			}

			g.selectAll('path')
				// update
					.data(features, function(d) {
						return d.properties.REPORTING_UNIT;
					})
					.attr('class', function(d) {
						return Choropleth.chooseFillClass(d, results);
					})
				// enter
				.enter().append('path')
					.attr('class', function(d) {
						return Choropleth.chooseFillClass(d, results);
					})
					.attr('d', path)
					.on('mousemove', function(d) {

						var svg = $(this).parents('svg').get(0);

						var dimensions = self.getViewBoxDimensions(svg);
						var mouse = d3.mouse(this);

						var position = {
							x: (100 * mouse[0]/dimensions.width).toFixed(1),
							y: (100 * mouse[1]/dimensions.height).toFixed(1),
						};

						tooltipCallback(d, position);
						select(this);
					})
					.on('mouseout', function() {
						tooltipCallback(null, null);
						deselect(this);
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
		chooseFillClass: function(d, race) {

			// how many different colors can a town have?
			// 1: not in race                          - e.g. non-state-wide races

			// 2: in race, no winner, no votes         - e.g. results are in, no winner yet, and no one voted in this town
			// 3: in race, no winner,    votes,    tie - e.g. results are in, no winner yet, and this town is supporting all candidates equally
			// 4: in race, no winner,    votes, no tie - e.g. results are in, no winner yet, and this town is favoring one candidate (COLOR)

			// 5: in race,    winner, no votes         - e.g. results are in, there is a winner, and no one voted in this town
			// 6: in race,    winner,    votes,    tie - e.g. results are in, there is a winner, and this town is supporting all candidates equally
			// 7: in race,    winner,    votes, no tie - e.g. results are in, there is a winner, and this town is favoring one candidate (COLOR)

			var reportingUnit = d.properties.reporting_unit;
			var klass = 'notinrace';

			if (reportingUnit) {

				// sort results by vote_count, descending
				var results = _.sortBy(reportingUnit.results, function(result) {
					return -result.vote_count;
				});

				// do we have a winner?
				var thereIsAWinner = _.some(results, {winner: 'X'});

				// do we have any votes?
				var thereAreVotes = _.last(results).vote_count > 0;

				// is there a tie?
				var thereIsATie = _.first(results).vote_count === _.last(results).vote_count;

				// is this a primary?
				var isPrimary = race.race_type === 'Primary';

				// if this is a primary, sort candidates by id - we'll need them later
				// otherwise don't do it - save a nanosecond
				var candidateIds = null;
				if (isPrimary) {
					candidateIds = _.chain(race.candidates)
						.sortBy('id')
						.pluck('id')
						.value();
				}

				if (!thereIsAWinner) {
					if (!thereAreVotes) {
						klass = 'inrace-nowinner-novotes';
					} else {
						if (thereIsATie) {
							klass = 'inrace-nowinner-votes-tie';
						} else {
							klass = 'inrace-nowinner-votes-notie';
							klass += ' ' + util.getColor({
								isPrimary: isPrimary,
								candidateIds: candidateIds,
								result: _.first(results)
							});
						}
					}
				} else {
					if (!thereAreVotes) {
						klass = 'inrace-winner-novotes';
					} else {
						if (thereIsATie) {
							klass = 'inrace-winner-votes-tie';
						} else {
							klass = 'inrace-winner-votes-notie';
							klass += ' ' + util.getColor({
								isPrimary: isPrimary,
								candidateIds: candidateIds,
								result: _.first(results)
							});
						}
					}
				}
			}

			return klass;
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
		if (!this.props.results && props.results) {

			// first, create and set geometry objects as class variable
			this.geometryObjects = Choropleth.createGeometryObjects(props.results, this.props.shapefile);

			var isStatewideRace = props.results.reporting_units.length === this.geometryObjects.allTowns.features.length + 1;

			// next, create the full map svg container
			// and save the svg and path, since we'll need them for later
			var fullMapSvgAndPath = Choropleth.createSvgAndPath({
				feature: this.geometryObjects.raceTownsOutline,
				node: this.getDOMNode().querySelector('.fullmap svg')
			});

			// create the features container - draw it first,
			// so that the outlines will be drawn above
			fullMapSvgAndPath.svg.append('g').attr('class', 'features');

			// save the path - we'll need it every time we update the map with new data
			// TODO: maybe it shouldn't be called just 'path'
			this.path = fullMapSvgAndPath.path;

			// next, draw the full map outlines
			// for now, let's just draw the race towns outline
			Choropleth.drawOutlines({
				svg: fullMapSvgAndPath.svg,
				path: this.path,
				raceTownsOutline: this.geometryObjects.raceTownsOutline
			});

			// next, draw the full map label and text
			// first, find the town with most population
			var largestTown = _.chain(this.geometryObjects.raceTowns)
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

			if (!isStatewideRace) {
				// next, create the mini map svg container
				var miniMapSvgAndPath = Choropleth.createSvgAndPath({
					feature: this.geometryObjects.allTownsOutline,
					node: this.getDOMNode().querySelector('.minimap svg')
				});

				// next, draw the mini map outlines
				Choropleth.drawOutlines({
					svg: miniMapSvgAndPath.svg,
					path: miniMapSvgAndPath.path,
					allTownsOutline: this.geometryObjects.allTownsOutline,
					raceTownsOutline: this.geometryObjects.raceTownsOutline
				});
			} else {
				$(this.getDOMNode().querySelector('.minimap')).addClass('hide');
			}

			// on viewport resize, maintain svg aspect
			window.addEventListener('resize', _.debounce(function() {
				Choropleth.updateSvgDimensions($('svg', self.getDOMNode()));
			}, 150));
			Choropleth.updateSvgDimensions($('svg', self.getDOMNode()));
		}

		// next is the part where we draw the data
		if (props.results && this.geometryObjects.raceTowns) {

			var node = d3.select(this.getDOMNode().querySelector('.fullmap svg g.features'));

			Choropleth.updateFullMap({
				results: props.results,
				features: this.geometryObjects.raceTowns,
				node: node,
				path: this.path,
				tooltipCallback: this.props.tooltipCallback
			});

		}

		return false;
	}
});

module.exports = Choropleth;