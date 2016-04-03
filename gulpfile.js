var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');

gulp.task('less', function() {
	return gulp.src('./public/less/**/*.less')
		   .pipe(less({
		   		paths: [ path.join(__dirname, 'less', 'includes')]
		   }))
		   .pipe(gulp.dest('./www/css'));
});

gulp.task('concat', function() {
	gulp.src([
		'./www/css/base.css',
		'./www/css/base.css',
		'./www/css/style.css'
	])
	.pipe(concat('main.css'))
	.pipe(gulp.dest('./www/css'));
});

gulp.task('watch', function() {
	gulp.watch('./public/less/**/*.less', ['less']);
});

gulp.task('default', ['concat', 'watch']);

