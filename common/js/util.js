module.exports = {

	raceTypeIDToParty: function(race_type_id) {
		return {
			'd': 'democratic',
			'r': 'republican',
			'0': 'independent'
		}[race_type_id.toLowerCase()];
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

	sortRaceByPartyDelegate: function(race) {
		var orderedRaceTypeIDs = ['d', 'r', '0'];
		return _.indexOf(orderedRaceTypeIDs, race.race_type_id.toLowerCase());
	}

};