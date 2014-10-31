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

		var title = this.props.name.replace(/(.*)(\d+)(th|st|nd|rd) (.*)/g, function(match, $1, $2, $3, $4, offset, original) {
			return ['<span>',$1,$2,'<sup>',$3,'</sup> ',$4,'</span>'].join('');
		});

		return (
			<div className={classes} dangerouslySetInnerHTML={{__html: title}} />
		);
	}

});

module.exports = Title;