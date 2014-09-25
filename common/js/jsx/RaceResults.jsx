/**
 * @jsx React.DOM
 */
var RaceResults = React.createClass({
	fetchData: function() {
		var url = 'http://www.bostonglobe.com/electionapi/races/number?number=' + this.props.race_number;
		console.log('fetching ' + url);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: '_' + this.props.race_number
		});
	},
	getInitialState: function() {
		return {race: {}};
	},
	componentDidMount: function() {
		window['_' + this.props.race_number] = function(json) {
			this.setState({race: json[0]});
		}.bind(this);
		this.fetchData();
	},
	render: function() {
		return (
			<div className='raceResults'>
				<RaceName         race={this.state.race} />
				<RaceResultsTable race={this.state.race} />
			</div>
		);
	}
});
