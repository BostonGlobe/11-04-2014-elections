var gulp             = require('gulp');
var runSequence      = require('run-sequence');
var promptForChoices = require('../util/promptForChoices.js');

gulp.task('default', function(done) {

	// ask user for choices, and wait to get all answers
	promptForChoices(function() {

		runSequence(
			'build',
			done
		);
	});
});