'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {
  return function() {
    return gulp.src('src/**/*.html', {since: gulp.lastRun('html')})
      //.pipe(critical({base: 'dist/', inline: true, css: ['dist/stylesheets/style.css']}))
      .pipe(gulp.dest(options.dst));
    };
};