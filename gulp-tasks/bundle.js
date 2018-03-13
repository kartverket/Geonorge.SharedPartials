const bundle = require('gulp-bundle-assets');

module.exports = function (gulp) {
	return function (config, env) {
		return gulp.src(config.url)
			.pipe(bundle())
			.pipe(gulp.dest(config.distFolder));
	}
};