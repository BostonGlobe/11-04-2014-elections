module.exports = (function() {

	function privateSetChoice(key, value) {
		global[key] = value;
	}

	function privateGetChoice(key) {
		return global[key];
	}

	return {
		setUserChoice: privateSetChoice,
		getUserChoice: privateGetChoice,

		html: function() {
			return {
				src: this.baseDir() + '/template' + privateGetChoice('graphicTemplate') + '.html',	
				dest: this.baseDir()
			};
		},

		baseDir: function() {
			return 'graphics/' + privateGetChoice('graphic');
		}
	};

})();