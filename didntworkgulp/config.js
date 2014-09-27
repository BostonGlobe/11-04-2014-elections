module.exports = (function() {

	function publicSetChoice(key, value) {
		global[key] = value;
	}

	function publicGetChoice(key) {
		return global[key];
	}

	return {
		setUserChoice: publicSetChoice,
		getUserChoice: publicGetChoice,
		baseDir: function() {
			return 'graphics/' + global.graphic;
		}
	};

})();