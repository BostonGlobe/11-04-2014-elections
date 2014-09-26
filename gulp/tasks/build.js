var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config.js');

gulp.task('build', function(done) {

	if (config.getUserChoice('packageToJpt')) {

	// 	// runSequence(
	// 	// 	'clean',
	// 	// 	'compile-stylesheets',
	// 	// 	'compile-templates',
	// 	// 	'compile-jsx',
	// 	// 	'build-html-prod',
	// 	// 	'minify',
	// 	// 	'smoosher'
	// 	// );

	} else {

	// 	// initMiddleware();

		runSequence(
			'clean',
			'sass',
			// 'compileLoDashTemplates',
			// 'compileJsxTemplates',
			// 'compile-jsx',
			'buildHtml',
			'browserSync',
			done
		);
	}

});