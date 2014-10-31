module.exports = {

	sentenceStyle: function(s) {
		return _.first(s).toUpperCase() + _.rest(s).join('').toLowerCase();
	},

	titleCase: function(str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	raceTitle: function(results) {

		var title;
		var seat = results.seat_name;
		var office = results.office_name;
		var state = this.standardizeState(results.state_postal);

		// seat, e.g. County commissioner -> County commissioner, Bristol, Mass.
		if (seat.length) {

			title = [this.standardizeOffice(this.sentenceStyle(office)), this.standardizeSeat(seat), state].join(', ');
		} else {
			// no seat, e.g. Governor -> Mass. governor
			title = [state, this.standardizeOffice(office.toLowerCase())].join(' ');
		}

		return title;
	},

	officeToUrl: function(office) {
		return this.standardizeOffice(office);
	},

	seatToUrl: function(seat) {
		return seat.replace(/&/g, '%2526');
	},

	standardizeState: function(state) {

		return state ? {
			'MA': 'Mass.',
			'NH': 'NH'
		}[state] : '';
	},

	standardizeOffice: function(office) {
		return office
			.replace(/u\.s\. /gi, 'US ')
			.replace(/state house/i, 'State House')
			.replace(/state senate/i, 'State Senate')
			.replace(/us house/i, 'US House')
			.replace(/us senate/i, 'US Senate');
	},

	clean: function(s) {

		return s
			.replace(/(\d+)(th|st|nd|rd)/g, '$1$2 ') // add space after 1st
			.replace(/\(/g, ' (') 	// add space before (
			.replace(/\)/g, ') ') 	// add space after (
			.replace(/&/g, ' & ')	// add space before and after &
			.replace(/\,/g, ', ')	// add space after ,
			.trim()					// trim string
			.replace(/\s+/g, ' ')	// collapse multiple whitespaces to one
			;
	},

	standardizeSeat: function(seat) {
		return this.clean(seat)
			.replace('Frankln', 'Franklin')
			.replace('Frnkln', 'Franklin')

			.replace('Hampshre', 'Hampshire')
			.replace('Hmpshire', 'Hampshire')
			.replace('Hampshr', 'Hampshire')

			.replace('Brkshire', 'Berkshire')

			.replace('Hampdn', 'Hampden')

			.replace('Worcstr', 'Worcester')

			.replace('Middlesx', 'Middlesex');
	},

	log: function(value) {
		console.log(JSON.stringify(value, null, 4));
	},

	// raceName: function(race) {

	// 	var display = '';

	// 	if (race) {

	// 		var date = Date(race.election_date);

	// 		var primary = race.race_type === 'Primary' ? race.race_type_id + ' primary' : null;

	// 		var name = _.chain([race.office_name, race.seat_name, primary])
	// 			.filter(function(v) {
	// 				return v;
	// 			})
	// 			.value()
	// 			.join(' - ');

	// 		display = name;
	// 	}

	// 	return display;
	// },

	raceTypeIDToParty: function(race_type_id) {
		return {
			'd': 'democrat',
			'r': 'republican'
		}[race_type_id.toLowerCase()];
	},

	partyAbbreviationToParty: function(abbreviation) {
		var result = {
			'dem': 'democrat',
			'gop': 'republican'
		}[abbreviation.toLowerCase()];

		return result;
	},

	formatPercent: function(x, decimalPlaces) {

		var _decimalPlaces = decimalPlaces || 0;

		if (x === 1) {
			return '100';
		} else if (x === 0) {
			return '0';
		} else {
			return (100*x).toFixed(_decimalPlaces).toString();
		}

	},

	numberWithCommas: function(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	},

	getColor: function(opts) {

		var QUALITATIVE_COLORS = [
			'#a6cee3',
			'#b2df8a',
			'#fb9a99',
			'#fdbf6f',
			'#cab2d6',
			'#1f78b4',
			'#33a02c',
			'#e31a1c',
			'#ff7f00',
			'#6a3d9a'
		];

		var REPUBLICAN = 'rgba(191, 97, 81, 1)';
		var REPUBLICANLEANING = 'rgba(223, 195, 182, 1)';
		var DEMOCRAT = 'rgba(89, 136, 157, 1)';
		var DEMOCRATLEANING = 'rgba(195, 213, 222, 1)';
		var INDEPENDENT = 'rgba(253, 205, 128, 1)';
		var INDEPENDENTLEANING = 'rgba(253, 205, 128, 0.5)';

		var isBallot = opts.isBallot;
		var isPrimary = opts.isPrimary;
		var candidate = opts.candidate;
		var candidates = opts.candidates;

		// here we must determine what color to use.
		// for this, we have two pieces of information:
		// this candidate, and these candidates.
		// we also know if this is a primary or ballot
		var color;

		// this is a primary OR a ballot issue
		if (isPrimary || isBallot) {

			var candidateIds = _.chain(candidates)
				.sortBy('id')
				.pluck('id')
				.value();

			// then we should assign a qualitative color,
			// based on this candidate's order in the list of candidates

			if (!candidate.ap_candidate_id) {
				throw 'ERROR: could not find candidate.ap_candidate_id';
			}
			var order = _.indexOf(candidateIds, candidate.ap_candidate_id);

			color = QUALITATIVE_COLORS[order];

		} else {

			// this is NEITHER a primary OR a ballot issue
			// assign colors based on the party
			// for now, don't look at leaning or ties or lack of data
			var party = this.partyAbbreviationToParty(candidate.party) || 'independent';

			color = {
				'democrat': DEMOCRAT,
				'republican': REPUBLICAN,
				'independent': INDEPENDENT
			}[party];

		}

		return color;
	}

};