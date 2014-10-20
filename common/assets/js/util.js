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

		var isPrimary = opts.isPrimary;
		var sortedCandidateIds = opts.candidateIds;
		var result = opts.result;

		var klass;

		if (isPrimary) {
			klass = 'color_' + _.indexOf(sortedCandidateIds, result.ap_candidate_id);
		} else {
			klass = this.partyAbbreviationToParty(result.party);
		}

		return klass;

	}

};