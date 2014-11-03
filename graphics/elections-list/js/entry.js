var Moment = require('moment');
var util = require('../../../common/assets/js/util.js');

(function() { globe.onDefine('window.jQuery && $(".igraphic-graphic.elections-list").length', function() {

	var usOffices = ['Governor', 'US House', 'US Senate'].map(function(office) {
		return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/2014-11-04/offices/' + office + '">' + util.standardizeOffice(office) + '</a></li>';
	}).join('');

	$('.igraphic-graphic.elections-list')
		.append('<h1>US offices</h1>')
		.append('<ul>' + usOffices +'</ul>');

	var states = ['ma', 'nh'];

	function stateOfficesCallback(json) {

		// make a list of offices
		var offices = _.chain(json)
			.map(function(result) {
				var moment = Moment(result.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/' + displayDate + '/offices/' + result.state_postal + '/' + result.alternate_office_name + '">' + util.officeTitle(result) + '</a></li>';
			})
			.uniq()
			.sortBy(function(v, i) {
				return v;
			})
			.value();

		$('.igraphic-graphic.elections-list')
			.append('<h1>' + json[0].state_postal + ' offices</h1>')
			.append('<ul>' + offices.join('') + '</ul>');
	}

	function stateRacesCallback(json) {

		// make a list of races
		var races = _.chain(json)
			.filter(function(result) {
				return result.race_type !== 'Ballot Issue';
			})
			.map(function(result) {
				var moment = Moment(result.election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/' + displayDate + '/race/' + result.state_postal + '/' + result.alternate_office_name + '/' + util.toUrl(result.seat_name) + '">' + util.raceTitle(result) + '</a></li>';
			})
			.uniq()
			.sortBy(function(v, i) {
				return v;
			})
			.value();

		$('.igraphic-graphic.elections-list')
			.append('<h1>' + json[0].state_postal + ' races</h1>')
			.append('<ul>' + races.join('') + '</ul>');
	}

	function stateTownsCallback(json) {

		var state = json[0].state_postal;

		// make a list of towns
		var towns = _.chain(json[0].reporting_units)
			.reject({fips_code: 0})
			.map(function(result) {
				var moment = Moment(json[0].election_date);
				var displayDate = moment.format('YYYY-MM-DD');
				return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/' + displayDate + '/town/' + state + '/' + result.county_name + '">' + [displayDate, result.county_name].join(', ') + '</a></li>';
			})
			.uniq()
			.sortBy(function(v, i) {
				return v;
			})
			.value();

		$('.igraphic-graphic.elections-list')
			.append('<h1>' + json[0].state_postal + ' towns</h1>')
			.append('<ul>' + towns.join('') + '</ul>');
	}

	states.forEach(function(state) {

		var callback = state + 'offices';

		window[callback] = stateOfficesCallback;
		
		$.ajax({
			url: 'http://devweb.bostonglobe.com/electionapi/race/location/' + state + '?detail=true&date=20141104',
			dataType: 'jsonp',
			jsonpCallback: callback
		});

	});

	states.forEach(function(state) {

		var callback = state + 'races';

		window[callback] = stateRacesCallback;
		
		$.ajax({
			url: 'http://devweb.bostonglobe.com/electionapi/race/location/' + state + '?detail=true&date=20141104',
			dataType: 'jsonp',
			jsonpCallback: callback
		});

	});

	states.forEach(function(state) {

		var callback = state + 'towns';

		window[callback] = stateTownsCallback;
		
		$.ajax({
			url: 'http://devweb.bostonglobe.com/electionapi/races/office/' + state + '/governor?detail=true&date=20141104',
			dataType: 'jsonp',
			jsonpCallback: callback
		});

	});

}); }());