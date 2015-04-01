var gulp = require('gulp'),
    sass = require('gulp-sass'),
    es =  require('event-stream'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    runSeq = require('run-sequence'),
    deploy = require('gulp-gh-pages'),
    htmlreplace = require('gulp-html-replace');

gulp.task('style', function () {
  return gulp.src(['./style/*.scss'])
    .pipe(sass({
      includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets/bootstrap'],
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./style/*.scss'],['style']);
});

gulp.task('font', function () {
  return gulp.src('fontello/**/*').pipe(gulp.dest('./dist'));
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(deploy(options));
});

gulp.task('index', ['style','js','font'], function () {
  return gulp.src('./dist/index.html')
    .pipe(htmlreplace({
      'css': ['css/bootstrap.css','css/selfont.css']
    }))
    .pipe(gulp.dest('./dist'));
});
