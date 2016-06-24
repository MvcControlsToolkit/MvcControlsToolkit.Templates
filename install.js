var gulp = require('gulp');
require('./gulpfile');

if (gulp.tasks.install) { 
    gulp.start('install');
}