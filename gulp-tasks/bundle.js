import assetBundler from "@userfrosting/gulp-bundle-assets";

module.exports = function (gulp) {
	return function (config, env) {
		return gulp.src(config.url)
			.pipe(assetBundler(config))
			.pipe(gulp.dest(config.distFolder));
	}
};