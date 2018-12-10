var gulp 	= require('gulp'),
  	sass 	= require('gulp-sass'),
  	concat 	= require('gulp-concat'),
  	uglify 	= require('gulp-uglify'),
  	rename 	= require('gulp-rename');

var paths = {
  styles: {
    src: 'assets/css/src/*.scss',
    dest: 'assets/css/dist/'
  },
  scripts: {
    src: 'assets/js/src/*.js',
    dest: 'assets/js/dist/'
  }
};

function styles() {
  return gulp
  	.src(paths.styles.src, {
      sourcemaps: true
    })
	.pipe(sass())
	.pipe(rename({
	  basename: 'staircase',
	  suffix: '.min'
	}))
.pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
	.src(paths.scripts.src, {
		sourcemaps: true
	})
	.pipe(uglify())
	.pipe(concat('staircase.min.js'))
	.pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp
	  .watch(paths.scripts.src, scripts);
  gulp
  	.watch(paths.styles.src, styles);
}

var build = gulp.parallel(styles, scripts, watch);

gulp
  .task(build);
gulp
  .task('default', build);