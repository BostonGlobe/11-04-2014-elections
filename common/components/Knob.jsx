/**
 * @jsx React.DOM
 */

var React  = require('react');
var KnobJS = require('../../libs/knob/knob.js');

var util   = require('../assets/js/util.js');

var Knob = React.createClass({

	getDefaultProps: function() {
		return {
			percent: 0
		};
	},

	render: function() {
		return (
			<div className='knob-wrapper'>
				<input type="text" value={this.props.percent} className="dial" readOnly data-min='0' data-max='100' data-height='100%' data-width='100%' />
			</div>
		);
	},

	// this is fired only once, after the initial render
	componentDidMount: function() {
		var input = this.getDOMNode().querySelector('input');
		$(input).knob({
			'fgColor': '#9B1518',
			'inputColor': '#9B1518',
			'bgColor': '#f1d0d1',
			'format': function(d) {
				return d + '%';
			}
		});
	},

	// this is fired after updating, but it's not
	// called after the initial render
	componentDidUpdate: function() {
		var input = this.getDOMNode().querySelector('input');
		$(input).trigger('change');
    }

});

module.exports = Knob;