var gulp = require('gulp'),
    sass = require('gulp-sass'),
    es =  require('event-stream'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    runSeq = require('run-sequence'),
    exec = require('child_process').exec;

var shell = function (cmd) {
  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
};

gulp.task('style', function () {
  gulp.src(['./style/*.scss'])
    .pipe(sass({
      includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets/bootstrap'],
      //outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
  gulp.src([
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

gulp.task('fontello', function () {
  shell('fontello-cli --config fontello.json --css fontello/css --font fontello/font install');
});

gulp.task('fonts', function () {
  return gulp.src('fontello/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
  runSeq('style','js');
});
