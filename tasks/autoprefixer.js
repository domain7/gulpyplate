'use strict';

const autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function() {

    gulp.src(options.src)
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(options.dst))
  };

};