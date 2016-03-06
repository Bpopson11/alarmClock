var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

// examaple gulp task
gulp.task('myTask', function() {
  console.log('Hello World');
});

// example default task through gulp
gulp.task('default', function() {
  console.log('Hello default action');
});

// call browserify
// gulp.task('jsBrowserify', function() {
//   return browserify( { entries: ['./js/browser.js'] } )
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('./build/js'));
// });

// concat practice, concat interface
gulp.task('concatInterface', function() {
  return gulp.src(['./js/browser.js' , './js/signup-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

// using a second arguement with gulp.task, we are passing in an array of task dependencies -> tasks to run first for this task to work
gulp.task('jsBrowserify' , ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});
