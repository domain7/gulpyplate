'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {

  return function() {
    return combine(
        gulp.src(options.src),
        $.sassGlob(),
        $.if(isDevelopment, $.sourcemaps.init()),
        $.sass(),
        $.autoprefixer({
          browsers: ['last 5 versions']
        }),
        $.if(isDevelopment, $.sourcemaps.write()),
        gulp.dest(options.dst)
    ).on('error', $.notify.onError());
  };

};