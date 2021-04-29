var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();
var browser = require('browser-sync').create();
var del = require('del');

var browserify = require("browserify");
var source = require("vinyl-source-stream");

var html = function(){
    return gulp.src("index.html")
      .pipe(gulp.dest("dist/"))
      .on("end", browser.reload);
}

var mkDist = function(cb){
    new plugins.run.Command('mkdir dist').exec();
    cb();
}

var babel = function babel(){
    return gulp.src("src/**/*.js")
        .pipe(plugins.babel({
              presets: ['@babel/preset-env']
          }))
          // 注意: 这里不可以uglify() 否则无法被browserify处理
        .pipe(gulp.dest("lib"))
}

var brow = function(cb){
    var b = browserify({
        entries: "lib/main.js"
    });

    b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"))
        .on("end", browser.reload);
    cb();
}

var clean = function clean(cb){
    del(['dist', 'lib'], cb());
}

var test = function test(cb) {
  new plugins.run.Command('npm test').exec();
  cb();
}

var webserver = function(cb){
    browser.init({
        server: "./dist",
        port: 4001
    });
    gulp.watch("src/**/*.js", gulp.series(babel, brow));
    gulp.watch("./index.html", html);
//    gulp.watch("./scss/*.scss", ["setSass"]);
    cb();
}

var initialize = function(cb){
    new plugins.run.Command('mkdir dist').exec();
    new plugins.run.Command('mkdir lib').exec();
    cb();
}

gulp.task("init", initialize)
gulp.task("html", html)
gulp.task("babel", babel)
gulp.task("brow", brow)
gulp.task("clean", clean)
gulp.task("test", test)
gulp.task("build", gulp.series(initialize, html, babel, brow))
gulp.task("dev", webserver)
