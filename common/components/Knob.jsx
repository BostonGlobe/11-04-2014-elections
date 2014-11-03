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
				<input type="text" value={this.props.percent}  data-party={this.props.party} className="dial" readOnly data-min='0' data-max='100' data-height='100%' data-width='100%' />
			</div>
		);
	},

	// this is fired only once, after the initial render
	componentDidMount: function() {
		var input = this.getDOMNode().querySelector('input');
		var party = $(input).attr('data-party');
		
		var colors = {
			'Democrat': {
				'fg': 'rgba(89, 136, 157, 1)',
				'bg': 'rgba(89, 136, 157, 0.2)'
			},
			'Republican': {
				'fg': 'rgba(191, 97, 81, 1)',
				'bg': 'rgba(191, 97, 81, 0.2)'
			}
		};

		$(input).knob({
			'fgColor': colors[party].fg,
			'inputColor': colors[party].fg,
			'bgColor': colors[party].bg,
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