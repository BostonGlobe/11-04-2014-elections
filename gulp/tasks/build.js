var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('build', function(done) {

	if (config.getUserChoice('packageToJpt')) {

		runSequence(
			// 'compile-stylesheets',
			// 'compile-templates',
			// 'build-html-prod',
			// 'minify',
			// 'smoosher'
		);

	} else {

		runSequence(
			'watch',
			'html',
			'browser-sync',
			'sass',
			'webpack'
		);
	}
});