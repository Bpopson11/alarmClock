var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');

var buildProduction = utilities.env.production;

// linter
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// examaple gulp task
gulp.task('myTask', function() {
  console.log('Hello World');
});

// example default task through gulp
gulp.task('default', function() {
  console.log('Hello default action');
});

// concat practice, concat interface
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*.js'])
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

// minify
gulp.task('minifyScripts', ['jsBrowserify'] , function() {
  return gulp.src('./build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('clean', function(){
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'] , function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});
