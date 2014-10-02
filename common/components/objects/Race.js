var Race = {

	getName: function(race) {

		var name = _.chain([race.office_name, race.seat_name])
			.filter(function(v) {
				return v.length;
			})
			.value()
			.join(' - ');

		return name;
	}

};

module.exports = Race;