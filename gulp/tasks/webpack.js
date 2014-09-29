var gulp        = require('gulp');
var webpack     = require('gulp-webpack');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('webpack', function() {
	return gulp.src(config.baseDir() + '/js/entry.js')
		.pipe(webpack({
			watch: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});