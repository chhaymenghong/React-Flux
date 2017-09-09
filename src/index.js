/** This is an entry file for browserify. Browserify will come here
 * and load all dependencies **/
// defined without var so that it becomes global.Bootstrap expects jquery in the global namespace
$ = jquery = require('jquery');

var App = console.log('hi');
module.exports = App;