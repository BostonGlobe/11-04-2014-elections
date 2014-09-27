var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var config         = require('../config');
var sass           = require('gulp-ruby-sass');

gulp.task('sass', function() {
	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});
