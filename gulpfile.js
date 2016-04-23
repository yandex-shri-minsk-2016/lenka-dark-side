var gulp = require('gulp'),
    jade = require('gulp-jade'),
    webserver = require('gulp-webserver'),
    jscs = require('gulp-jscs'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    argv = require('minimist')(process.argv.slice(2)),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin');

gulp.task('img', function () {
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./dist/images'))

});

gulp.task('stylus', function() {
    return gulp.src('./src/index.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('jscs', function () {
    return gulp.src(['./public/**/*.js','gulpfile.js', 'server.js'])
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jade', function () {
    gulp.src('./src/views/**/*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify', function() {
    return gulp.src('./public/*.html')
    .pipe(gulpif(argv.production, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('./public'));
});

gulp.task('uglify', function() {
  return gulp.src('./public/js/*.js')
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.styl', ['stylus']);
    gulp.watch('./src/**/*.jade', ['jade']);
    gulp.watch('./src/images/**', ['img']);
});

gulp.task('webserver', function () {
    gulp.src('./dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['stylus','jade','watch', 'webserver', 'img']);

