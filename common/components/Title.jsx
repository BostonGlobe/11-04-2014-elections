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

		var prefix = this.props.number && this.props.ordinal ?
			<span>{this.props.number}<sup>{this.props.ordinal}</sup> </span> :
			null;

		return (
			<div className={classes}>{prefix}{this.props.name}</div>
		);
	}

});

module.exports = Title;