/**
 * @jsx React.DOM
 */

var React = require('react');

var Loading = React.createClass({

	render: function() {
		return (
			<div className='loading'>
				<svg x="0px" y="0px" width="40" height="40" viewBox="0 0 31.027 27.484" enable-background="new 0 0 31.027 27.484">
					<polyline className="loadingdraw" fill="none" stroke="#CCCCCC" strokeWidth="5" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="23,3.984 2.5,3.984 2.5,24.984 23.5,24.984 23.5,4.484"/>
					<line className="loadingdraw2" fill="none" stroke="#AA0016" strokeWidth="6" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="10.68" y1="10.151" x2="11.405" y2="17.466"/>
					<line className="loadingdraw2" fill="none" stroke="#AA0016" strokeWidth="4.5" strokeLinecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="12.793" y1="17.749" x2="28.777" y2="2.25"/>
				</svg>
			</div>
		);
	}

});

module.exports = Loading;