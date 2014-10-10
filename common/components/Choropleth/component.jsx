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
				<svg></svg>
			</div>
		);
	},

	chooseFillClass: function(d) {

		// how many different colors can a town have?
		// 1: not in race                          - e.g. non-state-wide races

		// 2: in race, no winner, no votes         - e.g. results are in, no winner yet, and no one voted in this town
		// 3: in race, no winner,    votes,    tie - e.g. results are in, no winner yet, and this town is supporting all candidates equally
		// 4: in race, no winner,    votes, no tie - e.g. results are in, no winner yet, and this town is favoring one candidate

		// 5: in race,    winner, no votes         - e.g. results are in, there is a winner, and no one voted in this town
		// 6: in race,    winner,    votes,    tie - e.g. results are in, there is a winner, and this town is supporting all candidates equally
		// 7: in race,    winner,    votes, no tie - e.g. results are in, there is a winner, and this town is favoring one candidate

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

			if (!thereIsAWinner) {
				if (!thereAreVotes) {
					klass = 'inrace-nowinner-novotes';
				} else {
					if (thereIsATie) {
						klass = 'inrace-nowinner-votes-tie';
					} else {
						klass = 'inrace-nowinner-votes-notie';
						klass += ' ' + util.partyAbbreviationToParty(_.first(results).party);
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
						klass += ' ' + util.partyAbbreviationToParty(_.first(results).party);
					}
				}
			}
		}

		return klass;
	},

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

		var g = d3.select(this.getDOMNode().querySelector('svg g'));

		g.selectAll('path')
			// update
				.data(features)
				.attr('class', this.chooseFillClass)
			// enter
			.enter().append('path')
				.attr('class', this.chooseFillClass)
				.attr('d', this.path);




		// // first we'll bind results to topojson
		// features.forEach(function(feature) {

		// 	var match = _.find(results.reporting_units, function(reporting_unit) {
		// 		return reporting_unit.county_name.toUpperCase() === feature.properties.TOWN;
		// 	});

		// 	debugger;

		// });



		// // get the reporting unit for this json feature town
		// // TODO: is this the most performant way? or am i prematurely optimizing
		// var reporting_unit = _.find(race.reporting_units, function(reporting_unit) {
		// 	return reporting_unit.county_name.toUpperCase() === d.properties.TOWN;
		// });

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
		this.path = d3.geo.path()
			.projection(projection);

		// Compute the bounds of a feature of interest.
		var b = this.path.bounds(feature);

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

		// create the features container
		svg.append('g');

		// create the outline
		// TODO: is this the best way of drawing the outline?
		svg.append('path')
			.datum(topojson.mesh(shapefile, shapefile.objects.TOWNS, function(a, b) {
				return a === b;
			}))
			.attr({
				'd': this.path,
				'class': 'outline'
			});

		// next is the part where we draw the data
		this.updateMap(this.props.results);

		window.addEventListener('resize', _.debounce(this.updateContainerDimensions, 150));
		this.updateContainerDimensions();
	},

	shouldComponentUpdate: function(props, state) {

		// next is the part where we draw the data
		this.updateMap(props.results);

		return false;
	}

});

module.exports = Choropleth;