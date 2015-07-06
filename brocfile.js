var concat      = require('broccoli-concat');
var pickFiles   = require('broccoli-static-compiler');
var mergeTrees  = require('broccoli-merge-trees');
var compileLess = require('broccoli-less-single');

// var libraries = concat('libraries/', {
//   inputFiles: ['**/*.js'],
//   outputFile: '/libraries.js'
// });
var scripts = concat('js/', {
  inputFiles: ['**/polyfills.js', '**/settings.js', '**/timer.js', '**/save.js', '**/app.js'],
  outputFile: '/scripts.js'
});

var storyJs = concat('js/', {
  inputFiles: ['**/data.js'],
  outputFile: '/storyData.js'
});

// var prodJs = concat('js/', {
//   inputFiles: ['**/product.js'],
//   outputFile: '/product.js'
// });

var appCss = compileLess(['css/'], 'main.less', '/styles.css')
// var prodCss = compileLess(['css/'], 'product.less', '/product.css')

var publicAssets = pickFiles('public/', {
  srcDir: '/assets',
  destDir: '/assets'
});
var publicIconFont = pickFiles('public/', {
  srcDir: '/fonts',
  destDir: '/fonts'
});
var publicFiles = pickFiles('public/', {
  srcDir: 'index.html',
  destDir: 'index.html'
});

// var publicProduct = pickFiles('public/', {
//   srcDir: 'product.html',
//   destDir: 'product.html'
// });

module.exports = mergeTrees([ storyJs, scripts, appCss, publicAssets, publicIconFont, publicFiles ]); //libraries, prodJs, publicProduct, prodCss,
