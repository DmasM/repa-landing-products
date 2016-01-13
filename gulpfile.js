var gulp = require('gulp'),             
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('default', ['watch']);

/***JS Hint Task */
gulp.task('jshint', function(){
    return gulp.src('js/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/*****Sass Task */
gulp.task('build-css', function(){
    return gulp.src('css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('serve', function(){
    browserSync({
        notify: false,
        port: 3000,
        server: './'
    });    
    gulp.watch('index.html, pages/*.html');
    gulp.watch('js/main.js', ['jshint']);
    gulp.watch('css/style.scss', ['build-css']);
    gulp.watch(['index.html', 'pages/*.html', 'css/*.css', 'js/main.js'], reload);    
});
