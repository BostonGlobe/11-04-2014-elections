/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');
var Moment            = require('moment');

var CandidatePhoto = React.createClass({

	statics: {

		filename: function(opts) {

			var office = opts.office_name;
			var seat = opts.seat_name;
			var state = opts.state_postal;
			var moment = Moment(opts.election_date);
			var displayDate = moment.format('YYYY-MM-DD');

			var entry = _.filter([displayDate, state, office, seat], function(v) {
					return v;
				}).join('-');

			return entry;
		},

		exists: function(opts) {

			var list = [
				'2014-11-04-MA-Governor'
			];

			var filename = CandidatePhoto.filename(opts);

			return _.contains(list, filename);
		}

	},

	render: function() {

		var filename = [CandidatePhoto.filename(this.props.race), this.props.candidate.last_name].join('-');

		return (
			<td className='candidate-photo' rowSpan='2'>
				<div>
					<img src='http://c.o0bg.com/rf/image_80x80/Boston/Library/Staff/Caricatures/abrahamy.png' />
				</div>
			</td>
		);
	}

});

module.exports = CandidatePhoto;