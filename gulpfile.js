'use strict';
 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	webserver = require('gulp-webserver');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
	return gulp.src('./views/**/*.jade')
		.pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest('./public'))
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('./public/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['sass', 'jade']);

