/**
 * @jsx React.DOM
 */

var React = require('react');
var PeriodicJS = require('exports?PeriodicJS!periodic.js');

var PollClock = React.createClass({

	periodic: null,

	duration: 60,

	getInitialState: function() {
		return {secondsUntilPoll: this.duration};
	},

	// on init, setup periodic
	componentDidMount: function() {

		var self = this;

		this.periodic = PeriodicJS();

		this.periodic.setup({
			duration: self.duration*1000,
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
		this.props.pollCallback();
	},

	resume: function() {
		this.periodic.run();
	},

	stop: function() {
		this.setState({stopped: true});
	},

	render: function() {
		return (
			<p className={'hed-cat poll-clock ' + (this.state.stopped ? 'hide' : '')}>update in {this.state.secondsUntilPoll}</p>
		);
	}

});

module.exports = PollClock;