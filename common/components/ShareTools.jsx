/**
 * @jsx React.DOM
 */

var React = require('react');
var util  = require('../assets/js/util.js');

var ShareTools = React.createClass({

	render: function() {

		var twitterFields = [{
			key: 'text',
			value: 'Election results: ' + this.props.name
		},{
			key: 'url',
			value: 'http://bostonglobe.com' + this.props.url
		},{
			key: 'via',
			value: 'BostonGlobe'
		}];

		var twitter = 'http://twitter.com/intent/tweet?' + _.chain(twitterFields)
			.map(function(field) {
				return [field.key, field.value].join('=');
			})
			.value()
			.join('&');

		return (
			<div className='share-tools'>
				<a href={twitter}>
					<span className='tool twitter'></span>
				</a>
				<a href=''>
					<span className='tool facebook'></span>
				</a>
			</div>
		);
	}

});

module.exports = ShareTools;