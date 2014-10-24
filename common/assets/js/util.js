module.exports = {

	log: function(value) {
		console.log(JSON.stringify(value, null, 4));
	},

	raceTypeIDToParty: function(race_type_id) {
		return {
			'd': 'democratic',
			'r': 'republican'
		}[race_type_id.toLowerCase()];
	},

	partyAbbreviationToParty: function(abbreviation) {
		var result = {
			'dem': 'democratic',
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
		var DEMOCRATIC = 'rgba(89, 136, 157, 1)';
		var DEMOCRATICLEANING = 'rgba(195, 213, 222, 1)';
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
				'democratic': DEMOCRATIC,
				'republican': REPUBLICAN,
				'independent': INDEPENDENT
			}[party];

		}

		return color;
	}

};