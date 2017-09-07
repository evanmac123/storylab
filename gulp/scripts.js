// ==== SCRIPTS ==== //

var gulp          = require('gulp'),
    watchify    = require('watchify'),
    browserify    = require('browserify'),
    babelify      = require('babelify'),
    gutil         = require('gulp-util'),
    plugins       = require('gulp-load-plugins')({ camelize: true }),
    source        = require('vinyl-source-stream'),
    buffer        = require('vinyl-buffer'),
    config        = require('../gulpconfig').scripts;

var opts = Object.assign({}, watchify.args, config.browserify);
var bundler = watchify(browserify(opts).transform(babelify, { presets: ['es2015'] }));

// Check core scripts for errors
gulp.task('scripts-lint', function() {
  return gulp.src([config.lint.src])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

// gulp.task('scripts', ['scripts-lint'], bundle);
gulp.task('scripts', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.build.src))
    .pipe(plugins.changed(config.build.dest))
    .pipe(plugins.rename({ extname: '.js' }))
    .pipe(gulp.dest(config.build.dest))
    .pipe(buffer())
    .pipe(plugins.uglify().on('error', gutil.log))
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.build.dest))
}
