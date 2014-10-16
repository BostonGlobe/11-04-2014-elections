/**
 * @jsx React.DOM
 */

var React = require('react');

var FetchResultsMixin = require('../mixins/FetchResultsMixin.jsx');
var PollClock = require('../components/PollClock.jsx');

var Strip = React.createClass({

	mixins: [FetchResultsMixin],

	// FetchResultsMixin needs this
	apiUrl: function() {
		var isDev = true;
		var url = 'http://' + (isDev ? 'devweb.' : 'www.') + 'bostonglobe.com/electionapi/races/number?' + this.props.choices.map(function(value) {
			return 'number=' + value;
		}).join('&');
		return url;
	},

	render: function() {
		return (
			<div className='strip'>
				<PollClock ref='thePollClock' pollCallback={this.fetchResults} />
				<pre>{JSON.stringify(this.state.results, null, 4)}</pre>
			</div>
		);
	}

});

module.exports = Strip;