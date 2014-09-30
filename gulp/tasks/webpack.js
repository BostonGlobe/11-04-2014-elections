var gulp        = require('gulp');
var webpack     = require('gulp-webpack');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('webpack', function() {
	return gulp.src(config.baseDir() + '/js/entry.js')
		.pipe(webpack({
			watch: true,
			module: {
				loaders: [
					{ test: /\.jsx$/, loader: 'jsx-loader' },
					{ test: /\.css$/, loader: 'style-loader!css-loader' }
				]
			}
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});