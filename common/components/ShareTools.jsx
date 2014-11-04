/**
 * @jsx React.DOM
 */

var React = require('react');
var util  = require('../assets/js/util.js');

var ShareTools = React.createClass({

	render: function() {

		var twitterFields = [{
			key: 'text',
			value: encodeURIComponent('Election results: ' + this.props.name)
		},{
			key: 'url',
			value: encodeURI('http://bostonglobe.com' + this.props.url)
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

		var facebookFields = [{
			key: 't',
			value: encodeURIComponent('Election results: ' + this.props.name)
		},{
			key: 'u',
			value: encodeURI('http://bostonglobe.com' + this.props.url)
		}];

		var facebook = 'http://www.facebook.com/sharer.php?' + _.chain(facebookFields)
			.map(function(field) {
				return [field.key, field.value].join('=');
			})
			.value()
			.join('&');

		util.log(twitter);

		return (
			<div className='share-tools'>
				<a href={twitter} className='tool twitter'>
				</a>
				<a href={facebook} className='tool facebook'>
				</a>
			</div>
		);
	}

});

module.exports = ShareTools;

		// return (
		// 	<div className='share-tools'>
		// 		<a href={twitter} className='tool twitter'>
		// 		</a>
		// 		<a href={facebook} className='tool facebook'>
		// 		</a>
		// 	</div>
		// );
