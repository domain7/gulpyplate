'use strict';

const gulp = require('gulp');

// A helper function that will require files as needed
function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}


const config = {
  servePath: '.tmp'
};


lazyRequireTask('styles', './tasks/styles', {
  src: 'src/stylesheets/style.scss',
  dst: config.servePath + '/stylesheets'
});


lazyRequireTask('clean', './tasks/clean', {
  dst: config.servePath
});


lazyRequireTask('html', './tasks/html', {
  dst: config.servePath
});


lazyRequireTask('serve', './tasks/serve', {
  src: config.servePath
});


lazyRequireTask('assets', './tasks/assets', {
  src: 'src/images/*',
  dst: config.servePath + '/images'
});


lazyRequireTask('autoprefixer', './tasks/assets', {
  src: config.servePath + '/stylesheets/style.css',
  dst: config.servePath + '/stylesheets'
});


gulp.task('build', gulp.series('clean', 'styles', 'autoprefixer', 'html', 'assets'));


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
