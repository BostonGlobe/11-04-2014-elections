/**
 * @jsx React.DOM
 */

var race = {
	name: 'US Representative: Sixth district',
	precincts: '77% precincts reporting',
	results: [{
		name: 'Moulton',
		votes: 34455,
		pct: 49.3
	},{
		name: 'Tierney',
		votes: 28882,
		pct: 41.4
	}]
};

React.renderComponent(
	<RaceResults race={race} />,
	document.getElementById('content')
);