var gulp = require("gulp"),
    insert= require("gulp-insert"),
    vn=require("vinyl-fs");

    var gutil = require('gulp-util');
    var through = require('through2');

    var grep = function(regex, options) {
    options = options || {};

    var restoreStream = through.obj();

    return through.obj(function(file, encoding, callback) {
        if (file.isStream()) {
        throw new gutil.PluginError('Stream not supported');
        }

        var match = regex.test(new String(file.contents))

        var invert = !!options.invert;
        if (invert && ! match || match && !invert) {
        callback(null, file);
        return;
        }

        restoreStream.write(file);
        callback();
    });
    }

    var toprependViewImport = '@using MvcControlsToolkit.Core.Views \n'
    +'@using MvcControlsToolkit.Core.Transformations \n'
    +'@using MvcControlsToolkit.Core.HtmlHelpers \n';
    var topappendViewImport = '\n@addTagHelper *, MvcControlsToolkit.Core'
    +'\n@addTagHelper *, MvcControlsToolkit.ControlsCore';
    var toPrependGulpfile = "\nrequire('gulp-load-subtasks')('tasks');\n";

    gulp.task('create:root', function () {
        return vn.src(["./root/**/*.*"], { base: './root' })
    .pipe(vn.dest("../..", {overwrite: false}));
    });
    gulp.task('copy:files', function () {
        return vn.src(["./wwwroot/**/*.*", "./tasks/**/*.*"], { base: '.' })
    .pipe(vn.dest("../..", {overwrite: false}));
    });
    gulp.task('copy:views', function () {
        return vn.src(["./Views/**/*.*"], { base: '.' })
    .pipe(vn.dest("../..", {overwrite: true}));
    });

    gulp.task('modify:viewimport', function () {
        return gulp.src(["../../Views/_ViewImports.cshtml"], { base: '../..' })
        .pipe(grep(/MvcControlsToolkit.Core.Views/, {invert: true}))
        .pipe(insert.wrap(toprependViewImport, topappendViewImport))
    .pipe(gulp.dest("../.."));
    });

    gulp.task('modify:gulpfile', function () {
        return gulp.src(["../../gulpfile.js"], { base: '../..' })
        .pipe(grep(/gulp-load-subtasks/, {invert: true}))
        .pipe(insert.prepend(toPrependGulpfile))
    .pipe(gulp.dest("../.."));
    });

    gulp.task("install", ["create:root", "copy:files", "copy:views", "modify:viewimport", "modify:gulpfile"]);

    