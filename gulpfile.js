var gulp = require('gulp'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify');

gulp.task('default', function() {
	 return gulp.src(['./js/main.js', './js/controllers.js', './js/config.js'])
    	.pipe(concat('bundle.js'))
    	.pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
	gulp.watch('./js/*.js', ['default'])
});