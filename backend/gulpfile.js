const gulp = require('gulp');
const uglify = require('gulp-uglify');

function build() {
  return gulp.src('server/**/*.js') // adjust the source directory as needed
    .pipe(uglify()) // minify/uglify your code
    .pipe(gulp.dest('dist')); // output to the dist directory
}

exports.build = build;