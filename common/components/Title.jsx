/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Title = React.createClass({

	render: function() {

		var cx = React.addons.classSet;
		var classes = cx({
			'is-header': this.props.isHeader,
			'is-subheader': !this.props.isHeader,
			'title': true
		});

		return (
			<div className={classes}>{this.props.name}</div>
		);
	}

});

module.exports = Title;