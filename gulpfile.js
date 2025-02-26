const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sassdoc = require('sassdoc'); 

const sassdocOptions = {
    dest: './sassdoc' 
};

function styles() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init()) 
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css')) 
        .pipe(cleanCSS()) 
        .pipe(rename({ suffix: '.min' })) 
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css')) 
        .pipe(sassdoc(sassdocOptions));
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', styles); 
}

exports.styles = styles;
exports.watch = watchFiles;
exports.sassdoc = () => gulp.src('./scss/**/*.scss').pipe(sassdoc(sassdocOptions)); // Tarea específica para documentación
exports.default = gulp.series(styles, watchFiles);
