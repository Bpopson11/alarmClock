var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// examaple gulp task
gulp.task('myTask', function() {
  console.log('Hello World');
});

// example default task through gulp
gulp.task('default', function() {
  console.log('Hello default action');
});

// call browserify
gulp.task('jsBrowserify', function() {
  return browserify( { entries: ['./js/browser.js'] } )
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});
