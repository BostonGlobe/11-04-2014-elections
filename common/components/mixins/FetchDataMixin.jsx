/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchDataMixin = {
	fetchData: function(isDev) {
		var url = 'http://' + (isDev ? 'localhost:8080' : 'www.bostonglobe.com') + '/electionapi/races/number?' + this.props.raceNumbers.map(function(value) {
			return 'number=' + value;
		}).join('&');

		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: '_' + this.props.raceNumbers.join('_')
		});
	},
	componentDidMount: function() {
		window['_' + this.props.raceNumbers.join('_')] = function(json) {
			this.setState({races:json});
		}.bind(this);
		this.fetchData();
	},
	getInitialState: function() {
		return {races: []};
	}
};

module.exports = FetchDataMixin;