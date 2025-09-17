const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

const config = {
  jsEntryFile: './assets/js/app/main.js',
  jsCustomDestination: './assets/js/',
  styleSRC: './assets/css/style.scss',
  styleDestination: './',
  outputStyle: 'compressed', // Alterado para 'compressed'
  errLogToConsole: true,
  precision: 10,
};

gulp.task('compileJS', function () {
  return browserify({ entries: config.jsEntryFile, debug: true })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.jsCustomDestination));
});

gulp.task('compileSCSS', function () {
  return gulp
    .src(config.styleSRC)
    .pipe(
      sass({
        outputStyle: config.outputStyle,
        precision: config.precision,
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.styleDestination));
});

gulp.task('default', gulp.parallel('compileJS', 'compileSCSS'));

gulp.task('watch', function () {
  gulp.watch(config.jsEntryFile, gulp.series('compileJS'));
  gulp.watch(config.styleSRC, gulp.series('compileSCSS'));
});
