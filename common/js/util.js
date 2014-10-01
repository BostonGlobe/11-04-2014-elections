module.exports = {

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

		return result || 'independent';
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

	sortRaceByType_delegate: function(race) {
		var orderedRaceTypeIDs = ['d', 'r', 'g'];
		return _.indexOf(orderedRaceTypeIDs, race.race_type_id.toLowerCase());
	}

};