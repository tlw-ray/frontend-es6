var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();
var browser = require('browser-sync').create();
var del = require('del');

var browserify = require("browserify");
var source = require("vinyl-source-stream");

var path = require('path')

var clean = function clean(){
    return del(['dist', 'lib']);
}

var html = function(){
    return gulp.src("index.html")
      .pipe(gulp.dest("dist"))
      .on("end", browser.reload);
}

var babel = function babel(){
    return gulp.src("src/**/*.js")
        .pipe(plugins.babel({
              presets: ['@babel/preset-env']
          }))
        .pipe(gulp.dest("lib"))
}

var brow = function(){
    return browserify({
            entries: "lib/main.js"
        }).bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"))
        .on("end", browser.reload);
}

var test = function test() {
  return new plugins.run.Command('npm test').exec();
}

var serve = function(){
    browser.init({
        server: "dist",
        port: 4001
    });
    gulp.watch("src/**/*.js", gulp.series(babel, brow));
    gulp.watch("index.html", html);
//    gulp.watch("./scss/*.scss", ["setSass"]);
}


gulp.task("clean", clean)
gulp.task("html", html)
gulp.task("babel", babel)
gulp.task("brow", brow)
gulp.task("serve", serve)
gulp.task("build", gulp.series('clean', 'html', 'babel', 'brow'))
gulp.task("dev", gulp.series('clean', 'build', 'serve'))
gulp.task("test", test)