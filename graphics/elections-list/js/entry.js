(function() { globe.onDefine('window.jQuery && $(".igraphic-graphic.elections-list").length', function() {

var states = ['ma', 'nh'];

function stateOfficesCallback(json) {

	// make a list of offices
	var offices = _.chain(json)
		.map(function(result) {
			return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/office/' + result.state_postal + '/' + result.office_name + '">' + [result.office_name].join(', ') + '</a></li>';
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
		.map(function(result) {
			return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/race/' + result.state_postal + '/' + result.office_name + '/' + result.seat_name + '">' + [result.office_name, result.seat_name].join(', ') + '</a></li>';
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
			return '<li><a href="http://devedit.bostonglobe.com/news/politics/election-results/town/' + state + '/' + result.county_name + '">' + [result.county_name].join(', ') + '</a></li>';
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
		url: 'http://devweb.bostonglobe.com/electionapi/race/location/' + state,
		dataType: 'jsonp',
		jsonpCallback: callback
	});

});

states.forEach(function(state) {

	var callback = state + 'races';

	window[callback] = stateRacesCallback;
	
	$.ajax({
		url: 'http://devweb.bostonglobe.com/electionapi/race/location/' + state,
		dataType: 'jsonp',
		jsonpCallback: callback
	});

});

states.forEach(function(state) {

	var callback = state + 'towns';

	window[callback] = stateTownsCallback;
	
	$.ajax({
		url: 'http://devweb.bostonglobe.com/electionapi/races/office/' + state + '/governor?detail=true',
		dataType: 'jsonp',
		jsonpCallback: callback
	});

});




}); }());