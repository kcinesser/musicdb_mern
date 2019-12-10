const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const filter       = require('gulp-filter');
const plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
const reload       = browserSync.reload;
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

var onError = function(err) {
    notify.onError({
      title:    "Error",
      message:  "<%= error %>",
    })(err);
    this.emit('end');
};

const plumberOptions = {
    errorHandler: onError,
  };

gulp.task('sass', function() {
    var autoprefixerOptions = {
      browsers: ['last 2 versions'],
    };
  
    var filterOptions = '**/*.css';
  
    var reloadOptions = {
      stream: true,
    };
  
    var sassOptions = {
      includePaths: [
  
      ]
    };
  
    return gulp.src('src/**/*.scss')
        .pipe(postcss([
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
        ]))
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/'))
        .pipe(filter(filterOptions))
        .pipe(reload(reloadOptions));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', gulp.series('sass'));
    gulp.watch('./tailwind.config.js', gulp.series('sass'));
});
  
gulp.task('default', gulp.series('sass', 'watch'));