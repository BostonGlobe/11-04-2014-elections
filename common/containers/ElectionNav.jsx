/**
 * @jsx React.DOM
 */

var React = require('react');

var ElectionNav = React.createClass({

	render: function() {
		return (
			<div className='election-nav'>
				<div className='logo'>
					<span>
						<svg viewBox="0 0 34 30.7" enable-background="new 0 0 34 30.7" >
							<g>
								<g>
									<path fill="#AA1E23" d="M33,0c0.3,0,0.6,0.1,0.7,0.4C33.9,0.7,34,1.1,34,1.7v0.5c0,1.2-0.6,2.4-1.7,3.6L32.1,6l-9.8,10.3
									c-2.1,2.2-3.8,3.9-5.3,5.1c-1.5,1.2-2.5,1.8-3.1,1.8c-0.6,0-1.4-0.3-2.4-0.9c-0.9-0.6-1.5-1.2-1.8-1.8c-0.2-0.5-0.5-1.6-0.7-3.4
									c-0.2-1.7-0.3-3.6-0.3-5.5c0-1.1,0.5-2.1,1.4-3s1.9-1.4,3-1.4c1,0,1.7,1,1.9,2.9c0,0.2,0,0.4,0,0.5c0.2,1.5,0.4,2.5,0.6,3.1
									c0.2,0.6,0.5,0.9,0.9,0.9c0.2,0,0.5-0.2,0.9-0.5s0.9-0.8,1.5-1.4l10-9.9c0.8-0.8,1.6-1.5,2.3-1.9C32,0.2,32.6,0,33,0" />
								</g>
								<path fill="#CDCCCC" d="M25,16.2v9.5H5v-20h5.5c0.8-0.4,1.6-0.5,2.4-0.5c0.4,0,1.2,0.1,1.9,0.5h8l4.6-4.5c0.2-0.2,0.3-0.3,0.5-0.4
								c-0.1,0-0.2,0-0.4,0h-25C1.1,0.7,0,1.8,0,3.2v25c0,1.4,1.1,2.5,2.5,2.5h25c1.4,0,2.5-1.1,2.5-2.5V10.9L25,16.2z" />
							</g>
						</svg>
						Campaign 2014
					</span>
				</div>
				<select>
					<option>Choose a race</option>
					<option>Choose a race</option>
					<option>Choose a race</option>
					<option>Choose a race</option>
					<option>Choose a race</option>
				</select>
				<ul className='links'>
					<li><span><a href='#'>All results</a></span></li>
					<li><span><a href='#'>Governor</a></span></li>
					<li><span><a href='#'>Attorney General</a></span></li>
					<li><span><a href='#'>Town results</a></span></li>
				</ul>
			</div>
		);
	}

});

module.exports = ElectionNav;