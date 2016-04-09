var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    webserver = require('gulp-webserver'),
    jscs = require('gulp-jscs'),
    gutil = require('gulp-util');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('jscs', function () {
    return gulp.src(['./public/**/*.js','gulpfile.js', 'server.js'])
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jade', function () {
    gulp.src('./views/**/*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./views/**/*.jade', ['jade']);
});

gulp.task('webserver', function () {
    gulp.src('./public/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'jade','watch', 'webserver']);

