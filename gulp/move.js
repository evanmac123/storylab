// ==== THEME ==== //

var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    config      = require('../gulpconfig').move;

gulp.task('move-html', function() {
  return gulp.src(config.html.src)
  .pipe(plugins.changed(config.html.dest))
  .pipe(gulp.dest(config.html.dest));
});

gulp.task('move-mst', function() {
  return gulp.src(config.mst.src)
  .pipe(plugins.changed(config.mst.dest))
  .pipe(gulp.dest(config.mst.dest));
});

gulp.task('move-htaccess', function() {
  return gulp.src(config.htaccess.src)
  .pipe(plugins.changed(config.htaccess.dest))
  .pipe(gulp.dest(config.htaccess.dest));
});

gulp.task('move-data', function() {
  return gulp.src(config.data.src)
  .pipe(plugins.changed(config.data.dest))
  .pipe(gulp.dest(config.data.dest));
});

// All the move tasks in one
gulp.task('move', ['move-html', 'move-mst', 'move-htaccess', 'move-data']);
