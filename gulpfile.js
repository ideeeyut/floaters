const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');
const sourceMaps = require('gulp-sourcemaps');
const pump = require('pump'); // improves error reporting over using pipe
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const folders = {
  src: 'src',
  dist: 'dist',
};

gulp.task('js', (cb) => {
  pump([
    gulp.src(`${folders.src}/app/**/*.js`),
    babel({ presets: ['es2015'] }),
    concat('app.min.js'),
    sourceMaps.init(),
    uglify(),
    sourceMaps.write(),
    gulp.dest(folders.dist),
  ], cb);
});


gulp.task('libs', (cb) => {
  pump([
    gulp.src([
      'node_modules/qrcode-generator/qrcode.js',
      'node_modules/qrcode-generator/qrcode_UTF8.js',
      'node_modules/angular-qrcode/angular-qrcode.js',
      'node_modules/angularjs-geolocation/dist/angularjs-geolocation.min.js'
    ]),
    concat('libs.js'),
    gulp.dest('dist'),
  ], cb);
});

gulp.task('html', (cb) => {
  pump([
    gulp.src(`${folders.src}/index.html`),
    gulp.dest(folders.dist),
  ], cb);
});

gulp.task('views', (cb) => {
  pump([
    gulp.src(`${folders.src}/app/**/*.html`),
    flatten(),
    gulp.dest(`${folders.dist}/views`),
  ], cb);
});

gulp.task('css', (cb) => {
  pump([
    gulp.src(`${folders.src}/**/*.scss`),
    sourceMaps.init(),
    sass(),
    sourceMaps.write(),
    concat('app.min.css'),
    gulp.dest('dist'),
  ], cb);
});

gulp.task('watch', () => {
  gulp.watch(`${folders.src}/app/**/*.js`, ['js']);
  gulp.watch(`${folders.src}/index.html`, ['html']);
  gulp.watch(`${folders.src}/app/**/*.html`, ['views']);
  gulp.watch(`${folders.src}/**/*.scss`, ['css']);
});

gulp.task('serve', () => {
  browserSync.init({
    server: { baseDir: './dist' },
    files: ['./dist/**/*.*'],
    notify: false,
  });
});

gulp.task('develop', ['js', 'libs', 'html', 'views', 'css', 'watch', 'serve']);
