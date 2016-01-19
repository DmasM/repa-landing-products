var gulp = require('gulp'),  
    plumber = require('gulp-plumber'),           
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
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
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('./'))        
        .pipe(gulp.dest('css'));
});

var output = {
    source_map : true
}
gulp.task('minify', function(){
    return gulp.src('js/main.js')        
        .pipe(plumber())
        .pipe(uglify({output: output}))
        .pipe(rename({extname: '.min.js'}))        
        .pipe(gulp.dest('js'));
});

gulp.task('serve', function(){
    browserSync({
        notify: false,
        port: 3000,
        server: './'
    });    
    gulp.watch('index.html, pages/*.html');
    gulp.watch('js/main.js',['minify']);
    gulp.watch('css/style.scss', ['build-css']);
    gulp.watch(['index.html', 'pages/*.html', 'css/*.css', 'js/main.js'], reload);    
});
