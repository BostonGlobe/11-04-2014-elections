var gulp            = require('gulp');
var webpack         = require('gulp-webpack');
var webpackPlugins  = require('gulp-webpack/node_modules/webpack');
var rename          = require('gulp-rename');
var browserSync     = require('browser-sync');
var config          = require('../config');

gulp.task('webpack', function() {

	var isProd = config.getUserChoice('packageToJpt');

	var plugins = !isProd ? [] : [
		new webpackPlugins.optimize.UglifyJsPlugin(),
		new webpackPlugins.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	];

	return gulp.src(config.baseDir() + '/js/entry.js')
		.pipe(webpack({
			watch: !isProd,
			module: {
				loaders: [
					{ test: /\.jsx$/, loader: 'jsx-loader' },
					{ test: /\.css$/, loader: 'style-loader!css-loader' }
				]
			},
			plugins: plugins
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});