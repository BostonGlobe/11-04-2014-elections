/**
 * @jsx React.DOM
 */

// for the time being, this component isn't responsible for fetching the topojson.
// it expects to receive it immediately.

var React = require('react');
var d3 = require('d3');
var topojson = require('topojson');
var util = require('../../../common/js/util.js');

var Choropleth = React.createClass({

	// used to preserve container aspect on window resize
	aspect: 0,

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
	},

	// this function gets called every time there's new results data
	// it binds results data to shapefile data,
	// and draws the town colors
	updateMap: function(results) {

		var shapefile = this.props.shapefile;

		// TODO: change name of TOWNS to something more generic.
		var feature = topojson.feature(shapefile, shapefile.objects.TOWNS);
		var features = feature.features;

		// bind results to shapefile
		var before = Date.now();
		if (results && results.reporting_units) {

			results.reporting_units.forEach(function(reporting_unit) {

				var match = _.find(features, function(feature) {
					return reporting_unit.county_name.toUpperCase() === feature.properties.TOWN;
				});

				if (match) {
					match.properties.reporting_unit = reporting_unit;
				}

			});

		}

		var after = Date.now();
		console.log('binding results to shapefile took ' + (after - before) + 'ms');

		var g = d3.select(this.getDOMNode().querySelector('.fullmap svg g'));

		var self = this;

		g.selectAll('path')
			// update
				.data(features)
				.attr('class', function(d) {
					return self.chooseFillClass(d, results);
				})
			// enter
			.enter().append('path')
				.attr('class', function(d) {
					return self.chooseFillClass(d, results);
				})
				.attr('d', this.path);
	},

	// this gets called on viewport resize. it resizes the svg container.
	updateContainerDimensions: function() {
		
		var self = this;
		var svgs = $('svg', self.getDOMNode());

		// force scrollbar just in case we need it
		// otherwise the targetWidth will be off
		$('body').height(10000);

		svgs.each(function() {

			// get aspect directly from svg
			var viewBox = this.getAttribute('viewBox').split(' ');
			var aspect = viewBox[2]/viewBox[3];

			var targetWidth = $(this).parent().width();

			$(this).attr('width', targetWidth);
			$(this).attr('height', targetWidth / aspect);

		});

		// reset scrollbar
		$('body').height('auto');
	},

	createMiniMap: function(results) {

		var shapefile = this.props.shapefile;

		// TODO: change name of TOWNS to something more generic.
		var masterRegion = topojson.feature(shapefile, shapefile.objects.TOWNS);

		var townsInRace = _.chain(results.reporting_units)
			.pluck('county_name')
			.map(function(county_name) {
				return county_name.toUpperCase();
			})
			.value();

		var raceRegion = topojson.merge(shapefile, shapefile.objects.TOWNS.geometries.filter(function(d) {
			return _.contains(townsInRace, d.properties.TOWN);
		}));

		// we'll center the map on the centroid
		var centroid = d3.geo.centroid(masterRegion);

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
		var b = path.bounds(masterRegion);

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
		var svg = d3.select(this.getDOMNode().querySelector('.minimap svg'));

		// create the container
		svg.attr({
			viewBox: [0, 0, width, height].join(' '),
			preserveAspectRatio: 'xMidYMid'
		});

		// create the features container
		svg.append('g');

		// create the master region outline
		svg.append('path')
			.datum(topojson.mesh(shapefile, shapefile.objects.TOWNS, function(a, b) {
				return a === b;
			}))
			.attr({
				'd': path,
				'class': 'master-region'
			});

		// create the region outline
		svg.append('path')
			.datum(raceRegion)
			.attr({
				'd': path,
				'class': 'region'
			});
	},

	// this gets called once, at the beginning, but only after
	// we have non-null results.
	// it does several things:
	// - setup all the d3 projection boilerplate
	// - create the svg container
	// - create the state outline
	// - create the race region outline (e.g. 1st Essex)
	// - draw the map
	// - wire up the resize event
	createFullMap: function(results) {

		var shapefile = this.props.shapefile;

		// TODO: change name of TOWNS to something more generic.
		var masterRegion = topojson.feature(shapefile, shapefile.objects.TOWNS);

		var townsInRace = _.chain(results.reporting_units)
			.pluck('county_name')
			.map(function(county_name) {
				return county_name.toUpperCase();
			})
			.value();

		var raceRegion = topojson.merge(shapefile, shapefile.objects.TOWNS.geometries.filter(function(d) {
			return _.contains(townsInRace, d.properties.TOWN);
		}));

		// we'll center the map on the centroid
		var centroid = d3.geo.centroid(raceRegion);

		// Create a unit projection.
		var projection = d3.geo.albers()
			.center([0, centroid[1]])
			.rotate([-centroid[0], 0])
			.scale(1)
			.translate([0, 0]);

		// Create a path generator.
		this.path = d3.geo.path()
			.projection(projection);

		// Compute the bounds of a feature of interest.
		var b = this.path.bounds(raceRegion);

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
		var s = 0.75 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
		var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

		// Update the projection to use computed scale & translate.
		projection
			.scale(s)
			.translate(t);

		// get this svg element
		var svg = d3.select(this.getDOMNode().querySelector('.fullmap svg'));

		// create the container
		svg.attr({
			viewBox: [0, 0, width, height].join(' '),
			preserveAspectRatio: 'xMidYMid'
		});

		// create the features container
		svg.append('g');

		// create the region outline
		svg.append('path')
			.datum(raceRegion)
			.attr({
				'd': this.path,
				'class': 'region'
			});

		// create the master region outline
		svg.append('path')
			.datum(topojson.mesh(shapefile, shapefile.objects.TOWNS, function(a, b) {
				return a === b;
			}))
			.attr({
				'd': this.path,
				'class': 'master-region'
			});

		// next is the part where we draw the data
		this.updateMap(this.props.results);
	},

	shouldComponentUpdate: function(props, state) {

		// is this the first time we get results?
		// if so, draw the map
		if (!this.props.results && props.results) {
			this.createFullMap(props.results);
			this.createMiniMap(props.results);
			window.addEventListener('resize', _.debounce(this.updateContainerDimensions, 150));
			this.updateContainerDimensions();	
		}

		// next is the part where we draw the data
		this.updateMap(props.results);

		return false;
	}

});

module.exports = Choropleth;