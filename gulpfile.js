var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var comb = require('gulp-csscomb');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var atImport = require('postcss-import');
var variables = require('postcss-simple-vars');
var bem = require('postcss-bem');
var nested = require('postcss-nested');

gulp.task('css-bem', function () {
    var processors = [
        atImport(),
        variables({ silent: true }),
        bem({defaultNamespace: 'hp',
            separators: {
            descendent: '__',
            modifier: '_'
                },
            shortcuts: {
                descendent: 'desc',
                component: 'comp'//override at-rule name
                }
        }),
        nested(),
    ];
    return gulp
        .src('css/postcss/*.css')
        .pipe(postcss(processors))
        .pipe(comb(''))
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('css-ugly', function () {
    return gulp
        .src('css/style.css')
        .pipe(minify())
        .pipe(rename('css/style.min.css'))
        .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
    gulp.watch('css/postcss/*.css', ['css-bem']);
});