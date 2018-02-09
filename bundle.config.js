var gulpif = require('gulp-if');

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
        gulpif(process.env.NODE_ENV === 'production', 'src/js/searchOptions/searchOption.prod.js',
          gulpif(process.env.NODE_ENV === 'test', 'src/js/searchOptions/searchOption.test.js',
            'src/js/searchOptions/searchOption.local.js')),
        'src/js/app.js',
        'src/js/menuTopController.js',
        'src/js/searchTopController.js'
      ],
      styles: "src/css/**/*.css",
      options: {
        rev: false
      }
    }
  },
  copy: [{
    src: 'src/images/**/*.{png,svg}',
    base: 'src/'
  }]
};