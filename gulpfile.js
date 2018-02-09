"use strict";

var gulp = require("gulp"),
bundleTask = require('./gulp-tasks/bundle')(gulp),
config = {
  url: './bundle.config.js',
  dist: 'dist'
};

gulp.task("default", function(){bundleTask(config)});
gulp.task("test", function(){bundleTask(config,"test")});
gulp.task("prod", function(){bundleTask(config,"prod")});