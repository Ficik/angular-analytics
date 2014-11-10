"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('docs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src('src/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'));
});

gulp.task('jshint', function() {
  gulp.src(['src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('default', ['docs', 'jshint']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/*'], ['default']);
});
