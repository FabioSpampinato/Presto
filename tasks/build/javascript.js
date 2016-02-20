
/* =========================================================================
 * Svelto - Tasks - Build - Javascript
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var changed      = require ( '../utilities/changed' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    project      = require ( '../config/project' ),
    plugins      = project.plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    babel        = require ( 'gulp-babel' ),
    concat       = require ( 'gulp-concat' ),
    flatten      = require ( 'gulp-flatten' ),
    gulpif       = require ( 'gulp-if' ),
    gutil        = require ( 'gulp-util' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sort         = require ( 'gulp-sort' ),
    uglify       = require ( 'gulp-uglify' );

/* JAVASCRIPT */

gulp.task ( 'build-javascript', 'Build javascript', ['build-javascript-temp'], function () {

  if ( !!project.isDevelopment ) {

    return gulp.src ( input.getPath ( 'javascript.temp' ) )
               .pipe ( newer ( output.getPath ( 'javascript.uncompressed' ) ) )
              //  .pipe ( require ( 'gulp-filelog')() )
               .pipe ( sort () ) //TODO: Needed?
               .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
               .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) );

  } else {

    var needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'dependencies', 'extend', 'babel', 'uglify' );

    needUpdate = true; //TODO: REMOVE

    return gulp.src ( input.getPath ( 'javascript.all' ) )
               .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
               .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.uncompressed' ) ) ) )
               .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
               .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.enabled ) ) )
               .pipe ( flatten () )
               .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
              //  .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
              //  .on ( 'error', function ( err ) { gutil.log ( err.message ); })
               .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
              //  .pipe ( gulpif ( plugins.uglify.enabled, uglify ( plugins.uglify.options ) ) )
               .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) );

  }

});
