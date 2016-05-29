var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var sourcemaps = require('gulp-sourcemaps');
var request = require('request');

var paths = {
  sass: ['./scss/**/*.scss']
};
/*
request.post({url: 'http://localhost:3000/', timeout: 3000, form: {key1: 'value2', key2: 'value2'}}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
        console.log('not success');
    }
});
*/
/*&
request.get({url:'http://192.168.1.19:7070/index.php?route=api/product'},function(error,response,body){
    console.log(body);
});
*/
gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('copy-static',function(){

});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

//生成厉害未见到.tmp
gulp.paths = {
  src: 'src',
  dist: 'www',
  tmp: '.tmp',
  e2e: 'e2e'
};
var paths = gulp.paths;
var wiredep = require('wiredep').stream;
//加载插件
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
gulp.task('partials', function () {
  return gulp.src([
    paths.src + '/app/scripts/**/*.html',
    paths.tmp + '/app/**/*.html'
  ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'cjd',
      }))
      .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('scripts', function() {
    return buildScripts();
});

gulp.task('html_dist',function(){
    gulp.src('www/index.html')
        .pipe($.useref())
        //.pipe($.uglify())
        .pipe($.if('**/*.js', $.jshint(),$.jshint.reporter('default')))
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        //.pipe($.if('**/*.js', $.uglify({preserveComments: $.uglifySaveLicense})))
        .pipe(gulp.dest('www'))
})

gulp.task('js_lint',function(){
    gulp.src('js/**/*.js')
        //.pipe($.useref())
        //.pipe($.uglify())
        //.pipe($.if('**/*.js', $.jshint(),$.jshint.reporter('default')))
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        //.pipe($.if('**/*.js', $.uglify({preserveComments: $.uglifySaveLicense})))
        //.pipe(gulp.dest('www'))
})

function buildScripts() {
    return gulp.src(paths.src+ '/app/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.size())
};


gulp.task('inject', ['scripts'], function () {

    var injectScripts = gulp.src([
        paths.tmp + '/partials/*.js',
        paths.src + '/app/scripts/app/**/*.js',
        paths.src + '/app/scripts/components/**/*.js',
    ]).pipe($.angularFilesort()).on('error', errorHandler('AngularFilesort'))
    .pipe($.angularFilesort()).on('error', errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [paths.src,paths.tmp + '/serve'],
        addRootSlash: true
    };

    return gulp.src(paths.src+'/app/index.html')
        //.pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
       // .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(paths.tmp + '/serve'));

});

var errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};


gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter('**/*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(paths.tmp + '/serve/*.html')

        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        //.pipe(jsFilter)
        ///.pipe($.ngAnnotate())
        .pipe($.if('**/*.js', $.ngAnnotate()))
        .pipe($.if('**/*.js', $.uglify()))
        .pipe($.if('**/*.css', $.replace('fonts/','../fonts/')))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.html', $.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        })))
       // .pipe($.ngAnnotate())
        //.pipe($.rev())
        //.pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        //.pipe($.replace('../bootstrap/fonts', 'fonts'))
        //.pipe($.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true
        //}))
        //.pipe(jsFilter)
        //.pipe($.ngAnnotate())
        //.pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        ////.pipe(jsFilter.restore())
        //.pipe(cssFilter)
        //.pipe($.replace('../bootstrap/fonts', 'fonts'))
        //.pipe($.csso())
        ////.pipe(cssFilter.restore())
        ////.pipe(assets.restore())
        ////.pipe($.useref())
        //.pipe($.revReplace())
        //.pipe(htmlFilter)
        //.pipe($.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true
        //}))
        ////.pipe(htmlFilter.restore())
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('scss', function(done) {
    gulp.src(paths.src+'/scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        //.pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.replace('../lib/ionic/release/fonts/','../fonts/'))
        //.pipe($.replace('fonts/','../fonts/'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.dist+'/assets/css/'))
        .on('end', done);
});


gulp.task('clean', function (done) {
    $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('fonts', function () {
    return gulp.src(paths.src+'/app/fonts')
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist+ '/assets/fonts/'));
});

gulp.task('bower_fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist+ '/assets/fonts/'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src+'/app/fonts')
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist+ '/assets/fonts/'));
});

gulp.task('images', function () {
    return gulp.src(paths.src + '/app/img/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('build', ['html', 'images', 'scss', 'fonts','bower_fonts']);