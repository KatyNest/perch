const { src, dest, watch, parallel, series } = require('gulp');

const less = require('gulp-less');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}
function cleanDist() {
  return del('perch')
}
function images() {
  return src('app/img/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('perch/img'))
}
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-slider/slick/slick.js',        
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}
function styles() {
  return src('app/less/style.less')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}
function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/webfonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('perch'))
}

function watching() {
  watch(['app/less/**/*.less'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);


