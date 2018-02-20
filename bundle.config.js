var gulpif = require('gulp-if'),
nodeUrl = 'node_modules/geonorge-shared-partials/';

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'
      ],
      styles: "node_modules/bootstrap/dist/css/bootstrap.css",
      options: {
        rev: false
      }
    },
    main: {
      scripts: [
        gulpif(process.env.NODE_ENV === 'prod', nodeUrl + 'src/js/searchOptions/searchOption.prod.js',
          gulpif(process.env.NODE_ENV === 'test', nodeUrl + 'src/js/searchOptions/searchOption.test.js',
            nodeUrl + 'src/js/searchOptions/searchOption.local.js')),
        nodeUrl + 'src/js/app.js',
        nodeUrl + 'src/js/baseController.js',
        nodeUrl + 'src/js/menuTopController.js',
        nodeUrl + 'src/js/searchTopController.js'
      ],
      styles: nodeUrl + 'src/css/**/*.css',
      options: {
        rev: false
      }
    }
  },
  copy: [{
    src: [nodeUrl + 'src/images/**/*.{png,svg}', nodeUrl + 'src/partials/*.html'],
    base: nodeUrl + 'src/'
  }]
};