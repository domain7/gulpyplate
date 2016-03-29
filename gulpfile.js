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

lazyRequireTask('styles', './tasks/styles', {
  src: 'src/stylesheets/style.scss',
  dst: '.tmp/stylesheets'
});

lazyRequireTask('clean', './tasks/clean', {
  dst: '.tmp'
});

lazyRequireTask('html', './tasks/html', {
  dst: '.tmp'
});

lazyRequireTask('serve', './tasks/serve', {
  src: '.tmp'
});

gulp.task('build', gulp.series('clean', 'styles', 'html'));

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

