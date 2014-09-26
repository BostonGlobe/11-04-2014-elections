var gulp        = require('gulp');
var concat      = require('gulp-concat');
var browserSync = require('browser-sync');
var react       = require('gulp-react');
var config      = require('../config.js');

gulp.task('compileJsxTemplates', function() {
	return gulp.src([
			'common/js/jsx/*.jsx',
			config.baseDir() + '/js/jsx/*.jsx'
		])
		.pipe(react())
		.pipe(concat('jsx.js'))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});
