/**
 * @jsx React.DOM
 */

var React = require('react');

var Knob = React.createClass({

	render: function() {
		return (
			<div className='knob-wrapper'>
				<div className='knob'>
					<pre>{JSON.stringify(this.props, null, 4)}</pre>
				</div>
			</div>
		);
	}

});

module.exports = Knob;