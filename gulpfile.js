var gulp = require("gulp"),
    insert= require("gulp-insert");

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
    var toPrependGulpfile = "\nrequire('gulp-load-subtasks')('tasks');";

    gulp.task('copy:files', function () {
        return gulp.src(["./Views/**/*.*", "./wwwroot/**/*.*", "./tasks/**/*.*"], { base: '.' })
    .pipe(gulp.dest("../.."));
    });

    gulp.task('modify:viewimport', function () {
        return gulp.src(["../../Views/_ViewImports.cshtml"], { base: '../..' })
        .pipe(grep(/MvcControlsToolkit.Core.Views/, {inverted: true}))
        .pipe(insert.wrap(toprependViewImport, topappendViewImport))
    .pipe(gulp.dest("../.."));
    });

    gulp.task('modify:gulpfile', function () {
        return gulp.src(["../../gulpfile.js"], { base: '../..' })
        .pipe(grep(/gulp-load-subtasks/, {inverted: true}))
        .pipe(insert.prepend(toPrependGulpfile))
    .pipe(gulp.dest("../.."));
    });

    gulp.task("install", ["copy:files", "modify:viewimport", "modify:gulpfile"]);

    