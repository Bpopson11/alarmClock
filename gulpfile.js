// Include gulp
var gulp = require('gulp');

// Plugins for gulp
var browserify = require('browserify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');

// Set build env from command line
var buildProduction = utilities.env.production;

// clean files
gulp.task('clean', function(){
  return del(['build', 'tmp']);
});

// linter
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// concat all js files, puts in tmp
gulp.task('concat', function() {
  return gulp.src(['./js/*.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

// Takes concatenated JS and browserify's it
// using a second arguement with gulp.task, we are passing in an array of task dependencies -> tasks to run first for this task to work
gulp.task('jsBrowserify' , ['concat'] , function() {
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

// build, based on production environment
gulp.task('build', ['clean'] , function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

// gulp watch files for changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['jshint' , 'build']);
});

// default action
gulp.task('default', ['lint', 'build', 'watch']);
