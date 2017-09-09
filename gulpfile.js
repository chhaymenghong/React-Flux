var gulp = require('gulp');
var webServer = require('gulp-connect');
var open = require('gulp-open');

var config = {
    baseUrl: 'http://localhost',
    port: 5000,
    resources: {
        html: './src/*.html'
    }
};

// setup a server
gulp.task('webServer', function() {
   webServer.server({
       root: ['dist'],
       livereload: true,
       port: 5000,
       base: config.baseUrl
   });
});


// need a plugin that can open a browser
gulp.task('openBrowser', ['webServer'], function () {
    gulp.src('dist/index.html')
        .pipe(open({
            uri: config.baseUrl + ':' + config.port + '/'
        }));
});


// Watch task
gulp.task('watch', function() {
    gulp.watch([config.resources.html], ['html']);
});

// need a task that save *html files to dist folder
gulp.task('html', function() {
    gulp.src(config.resources.html)
        .pipe(gulp.dest('./dist'))
        .pipe(webServer.reload());
});

// need a default task
gulp.task('default', ['html', 'openBrowser', 'watch']);