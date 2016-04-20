var jsxDir = './jsx',
    jsDir = './js',
    configs = {
        jsx : {
            src: jsxDir,
            dest: jsDir,
            get watch() {
                return this.src + '/**/*.js'
            }
        },
    },
    gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

gulp.task('jsx', function() {
    var bundler = browserify(configs.jsx.src + '/app.js', {basedir: __dirname});
    bundler.transform(reactify);
    var stream = bundler.bundle();
    return stream
        .pipe(source('app.js'))
        .pipe(gulp.dest(configs.jsx.dest));
});

gulp.task('watch', function() {
    gulp.watch(configs.jsx.watch, ['jsx']);
});

gulp.task('default', ['jsx', 'watch']);
