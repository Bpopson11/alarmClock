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
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
// Second set of parantheses causes this to run right away, grabs all bower dependencies (including bootstrap)
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

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

// build, based on production environment including bower
gulp.task('build', function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

// front end dependencies js gulp
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// front end dependencies css
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//starts server for browser-sync and watches bower dependencies
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.start(['build']);
  gulp.start(['bowerBuild']);
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

//builds front end dependencies
gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

//a bit redundant for the build process (skips the 'if production' part)
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

// combines bowerJS and bowerCSS
gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('cssBuild', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

// gulp watch files for changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['jshint' , 'build']);
});

// default action
gulp.task('default', ['lint', 'build', 'watch']);
