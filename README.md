# ⛔️ DEPRECATED Geonorge.SharedPartials
[![NPM version][npm-image]][npm-url]

Contains frontend for header used on Geonorge.no, including menu and search.

## Prerequisites
[npm](https://www.npmjs.com/get-npm), [gulp](https://gulpjs.com/)

## Install
```bash
$ npm install geonorge-shared-partials
```

Create the following gulpfile.js in the root of your project
```js
var nodeUrl = "./node_modules/geonorge-shared-partials/",
gulp = require("gulp"),
bundleTask = require(nodeUrl + "gulp-tasks/bundle")(gulp),
config = {
  url: nodeUrl + "bundle.config.js",
  distFolder: "./dist"
};

gulp.task("default", function(){bundleTask(config)});
```

## Basic Usage
Build js and css
```bash
$ gulp
```

Add stylesheets:
```html
<link rel="stylesheet" href="/dist/vendor.css" />
<link rel="stylesheet" href="/dist/main.css" />
```

Use the html files in your root layout
```cs
// C# example
@Html.Raw(File.ReadAllText(Server.MapPath("~/dist/partials/Header.html")))
```

Include javascripts:
```html
<script type="text/javascript" src="/dist/vendor.js" ></script>
<script type="text/javascript" src="/dist/main.js" ></script>
```

and include this js somewhere on your site
```js
var applicationEnvironment = "local"; // "prod", "test", "dev" or "local" 
var orderItems = $.cookie('orderitems'); // Update "shopping cart" icon
if (orderItems && orderItems > 0) {
    $('.downloads__count').show();
    $('.downloads__count').text(orderItems);
}
```

[npm-url]: https://npmjs.org/package/geonorge-shared-partials
[npm-image]: http://img.shields.io/npm/v/geonorge-shared-partials.svg
