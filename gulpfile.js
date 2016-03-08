(function () {

  'use strict';

// Util
var gulp = require('gulp');
var del = require('del');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

// CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');


// HTML
var critical = require('critical').stream;

// Dev http server
var browserSync = require('browser-sync').create();

// Environment
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';



gulp.task('styles', function() {

  return gulp.src('src/stylesheets/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError({
        message: 'Error: <%= error.message %>',
        title: 'Error running something'
      })
    }))
    .pipe(sassGlob())
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      //.pipe(gulpIf(!isDevelopment, combine(cssnano(), rev())))
      .pipe(gulp.dest('dist/stylesheets'));
      //.pipe(gulpIf(!isDevelopment, combine(rev.manifest('css.json'), gulp.dest('manifest'))));

    });


gulp.task('html', function() {
  return gulp.src('src/**/*.html', {since: gulp.lastRun('html')})
    .pipe(critical({base: 'dist/', inline: true, css: ['dist/stylesheets/style.css']}))
    .pipe(gulp.dest('dist'));
});



gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', gulp.series('clean', 'styles', 'html'));


gulp.task('serve', function() {
  browserSync.init({
    server: 'dist'
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});


gulp.task('dev',
  gulp.series(
    'build',
    gulp.parallel(
      'serve',
      function() {
        gulp.watch('src/stylesheets/**/*.scss', gulp.series('styles'));
        gulp.watch('src/**/*.html', gulp.series('html'));
      }
      )
    )
  );

}());