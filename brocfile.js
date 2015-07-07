var concat      = require('broccoli-concat');
var pickFiles   = require('broccoli-static-compiler');
var mergeTrees  = require('broccoli-merge-trees');
var compileLess = require('broccoli-less-single');

// var libraries = concat('libraries/', {
//   inputFiles: ['**/*.js'],
//   outputFile: '/libraries.js'
// });
var scripts = concat('js/', {
  inputFiles: ['**/polyfills.js', '**/settings.js', '**/timer.js', '**/save.js', '**/main.js'],
  outputFile: '/scripts.js'
});

var storyJs = concat('js/', {
  inputFiles: ['**/data.js'],
  outputFile: '/storyData.js'
});

var menuJs = concat('js/', {
  inputFiles: ['**/menu.js'],
  outputFile: '/menu.js'
});

var appCss = compileLess(['css/'], 'main.less', '/styles.css')
var menuCss = compileLess(['css/'], 'menu.less', '/menu.css')

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

var publicMenu = pickFiles('public/', {
  srcDir: 'menu.html',
  destDir: 'menu.html'
});

module.exports = mergeTrees([ storyJs, scripts, appCss, menuJs, publicMenu, menuCss, publicAssets, publicIconFont, publicFiles ]); //libraries, menuJs, publicMenu, menuCss,
