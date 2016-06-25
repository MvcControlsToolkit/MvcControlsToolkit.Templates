var gulp = require("gulp"),
    insert= require("gulp-insert"),
    grep = require("gulp-grep-contents");

    var toprependViewImport = '@using MvcControlsToolkit.Core.Views \n'
    +'@using MvcControlsToolkit.Core.Transformations \n';
    var topappendViewImport = '\n @addTagHelper *, MvcControlsToolkit.Core'
    +'\n @addTagHelper *, MvcControlsToolkit.ControlsCore';
    var toPrependGulpfile = "require('gulp-load-subtasks')('tasks') \n";

    gulp.task('copy:files', function () {
        return gulp.src(["./Views/**/*.*", "./wwwroot/**/*.*", "./tasks/**/*.*"], { base: '.' })
    .pipe(gulp.dest("../.."));
    });

    gulp.task('modify:viewimport', function () {
        return gulp.src(["../../Views/_ViewImports.cshtml"], { base: '../..' })
        .pipe(grep(/MvcControlsToolkit.Core/))
        .pipe(insert.wrap(toprependViewImport, topappendViewImport))
    .pipe(gulp.dest("../.."));
    });

    gulp.task('modify:gulpfile', function () {
        return gulp.src(["../../gulpfile.js"], { base: '../..' })
        .pipe(grep(/gulp-load-subtasks/))
        .pipe(insert.prepend(toPrependGulpfile))
    .pipe(gulp.dest("../.."));
    });

    