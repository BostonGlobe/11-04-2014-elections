var gulp   = require('gulp');
var rimraf = require('gulp-rimraf');
var config = require('../config.js');

gulp.task('clean', function(done) {

	return gulp.src(['index.html', '.tmp','PROD.jpt'], {
		read: false,
		cwd: config.baseDir()
	}).pipe(rimraf());
});