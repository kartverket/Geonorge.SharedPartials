var nodeUrl = 'node_modules/geonorge-shared-partials/';
//nodeUrl = "./"; // uncomment for local build

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
        nodeUrl + 'src/js/searchOptions.js',
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