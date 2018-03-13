"use strict";

var gulp = require("gulp"),
bundleTask = require('./gulp-tasks/bundle')(gulp),
config = {
  url: './bundle.config.js',
  distFolder: 'dist'
};

gulp.task("default", function(){bundleTask(config)});