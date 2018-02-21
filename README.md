# Geonorge.SharedPartials
[![NPM version][npm-image]][npm-url]

Contains frontend for header used on Geonorge.no, including menu and search.

## Prerequisites
[npm](https://www.npmjs.com/get-npm)

## Install
```bash
$ npm install geonorge-shared-partials
```

Create the following gulpfile.js in the root of your project
```js
var gulp = require("gulp"),
bundleTask = require('./node_modules/geonorge-shared-partials/gulp-tasks/bundle')(gulp),
config = {
  url: './node_modules/geonorge-shared-partials/bundle.config.js',
  dist: 'dist'
};

gulp.task("default", function(){return bundleTask(config)});
gulp.task("test", function(){bundleTask(config,"test")});
gulp.task("prod", function(){bundleTask(config,"prod")});
```

## Basic Usage
Build js and css
```bash
// Dev environment
$ gulp
```
```bash
// Test environment
$ gulp test
```
```bash
// Prod environment
$ gulp prod
```

Use the html files in your root layout
```cs
// C# example
@Html.Raw(File.ReadAllText(Server.MapPath("~/dist/partials/Header.html")))
```

[npm-url]: https://npmjs.org/package/geonorge-shared-partials
[npm-image]: http://img.shields.io/npm/v/geonorge-shared-partials.svg