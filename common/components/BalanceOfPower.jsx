/**
 * @jsx React.DOM
 */

var React = require('react');

var BalanceOfPower = React.createClass({

	render: function() {
		var results = this.props.results;

		return (
			<div className='balance-of-power'>

				<pre>{JSON.stringify(results, null, 4)}</pre>

			</div>
		);
	}

});

module.exports = BalanceOfPower;