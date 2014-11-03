/**
 * @jsx React.DOM
 */

var React = require('react');

var FullResultsButton = React.createClass({

	render: function() {
		return (
			<a href={this.props.url}>
				<button className='go-to-full-results'>Go to full results</button>
			</a>
		);
	}

});

module.exports = FullResultsButton;