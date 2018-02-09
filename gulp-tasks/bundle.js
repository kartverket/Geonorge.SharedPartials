const bundle = require('gulp-bundle-assets');

module.exports = function (gulp) {
	return function (config, env) {
		if (env === 'prod' || env === 'test')
			process.env.NODE_ENV = env;
		else
			process.env.NODE_ENV = 'development'
		return gulp.src(config.url)
			.pipe(bundle())
			.pipe(gulp.dest(config.dist));
	}
};