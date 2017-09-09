var gulp = require('gulp');
var webServer = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var cssConcat = require('gulp-concat');

var config = {
    baseUrl: 'http://localhost',
    port: 5000,
    resources: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ],
        entryJs: './src/index.js'
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
    gulp.watch([config.resources.js], ['js']);
});

// Task that save *html files to dist folder
gulp.task('html', function() {
    gulp.src(config.resources.html)
        .pipe(gulp.dest('./dist'))
        .pipe(webServer.reload());
});

// Task that handle js files
gulp.task('js', function() {
    browserify(config.resources.entryJs)
        .transform(reactify) // pipe all js files through reactify to transform all jsx to js
        .bundle() // bundle
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js')) //turn readable stream from browserify into virtual file format that gulp can understand
        .pipe(gulp.dest('dist' + '/scripts'))
        .pipe(webServer.reload());
});

gulp.task('css', function() {
    gulp.src(config.resources.css)
        .pipe(cssConcat('bundle.css'))
        .pipe(gulp.dest('dist' + '/css'));
});


// need a default task
gulp.task('default', ['html', 'js', 'css', 'openBrowser', 'watch']);