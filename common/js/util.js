module.exports = {

	raceTypeIDToParty: function(race_type_id) {
		return {
			'd': 'democratic',
			'r': 'republican',
			'0': 'independent'
		}[race_type_id.toLowerCase()];
	}

};