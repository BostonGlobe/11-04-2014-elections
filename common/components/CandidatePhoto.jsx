/**
 * @jsx React.DOM
 */

var React = require('react');

var util = require('../assets/js/util.js');
var Moment            = require('moment');

var CandidatePhoto = React.createClass({

	statics: {

		filename: function(opts) {

			var office = opts.alternate_office_name.replace(/\W/g, '');
			var seat = opts.seat_name.replace(/\W/g, '');
			var state = opts.state_postal;
			var moment = Moment(opts.election_date);
			var displayDate = moment.format('YYYY-MM-DD');

			var entry = _.chain([displayDate, state, office, seat])
				.filter(function(v) {
					return v;
				})
				.value().join('-').toLowerCase();

			return entry;
		},

		exists: function(opts) {

			var list = [
				'2014-11-04-ma-governor',
				'2014-11-04-ma-attorneygeneral',
				'2014-11-04-ma-auditor'
			];

			var filename = CandidatePhoto.filename(opts);

			return _.contains(list, filename);
		}

	},

	render: function() {

		var filename = [CandidatePhoto.filename(this.props.race), this.props.candidate.last_name.replace(/\W/g, '')].join('-').toLowerCase();
		var url = ['http://private.boston.com/multimedia/graphics/projectFiles/2014/11/assets/candidate-photos/', filename, '.png'].join('');

		return (
			<td className='candidate-photo' rowSpan='2'>
				<div>
					<img src={url} />
				</div>
			</td>
		);
	}

});

module.exports = CandidatePhoto;