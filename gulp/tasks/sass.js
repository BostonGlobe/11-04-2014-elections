var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var config      = require('../config');
var csso        = require('gulp-csso');
var util        = require('gulp-util');

gulp.task('sass', function() {

	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({compass: true}))
		.pipe(config.getUserChoice('packageToJpt') ? csso(true) : util.noop())
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});