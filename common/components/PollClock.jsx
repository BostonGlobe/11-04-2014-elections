/**
 * @jsx React.DOM
 */

var React = require('react');
var PeriodicJS = require('exports?PeriodicJS!periodic.js');

// this component should manage all the polling functionality
// so it needs to expose various start/stop methods
// and this instance should be callable from its parent

var PollClock = React.createClass({

	periodic: null,

	getInitialState: function() {
		return {secondsUntilPoll: 0};
	},

	// on init, setup periodic
	componentDidMount: function() {

		var self = this;

		this.periodic = PeriodicJS();

		this.periodic.setup({
			duration: 5*1000,
			display: function(time) {
				self.setState({secondsUntilPoll: Math.ceil(time/1000)});
			},
			update: function() {
				self.poll();
			}
		});

		// and then start polling
		this.periodic.run();
	},

	poll: function() {
		// e.g. call FetchDataMixin.fetchData
		this.props.pollCallback();
	},

	resume: function() {
		this.periodic.run();
	},

	render: function() {
		return (
			<div className='poll-clock'>update in {this.state.secondsUntilPoll}</div>
		);
	}

});

module.exports = PollClock;