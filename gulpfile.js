const gulp       = require('gulp'), // Подключаем Gulp
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    // uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    // del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    // imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    // pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов
    cssso = require('gulp-csso');
    uglify = require('gulp-uglify');
    cleancss = require('gulp-clean-css');
    pump = require('pump');
    minify = require("gulp-babel-minify");
    babel = require('gulp-babel');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
});

gulp.task('styles', function() {
  return gulp.src('app/css/**/*.css')
  // .pipe(cssso({
  //   restructure: false,
  //           sourceMap: true,
  //           debug: true
  // }))
  .pipe(rename({ suffix: '.min', prefix : '' }))
  // .pipe(autoprefixer(['last 15 versions']))
  .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream())
});

gulp.task("scripts", done => {
    gulp.src("./app/js/**/*.js")
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(gulp.dest("./dist/js"));
    done();
});


gulp.task('code', function() {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', function() {
    gulp.watch('app/css/**/*.css', gulp.parallel('styles'));
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
    gulp.watch('app/*.html', gulp.parallel('code'))
  });
  gulp.task('default', gulp.parallel('watch', 'styles', 'scripts', 'browser-sync'));



