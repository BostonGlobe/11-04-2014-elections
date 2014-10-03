var gulp            = require('gulp');
var template        = require('gulp-template');
var rename          = require('gulp-rename');
var config          = require('../config');
var getLatestCommit = require('../util/getLatestCommit.js');

gulp.task('log', function(done) {
	getLatestCommit(function(commit) {
		return gulp.src('log.template', {cwd: 'gulp/util'})
			.pipe(template(commit))
			.pipe(rename('log.html'))
			.pipe(gulp.dest('html', {cwd: config.baseDir()}));
	});
});