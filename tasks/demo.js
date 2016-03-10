
/* =========================================================================
 * Svelto - Tasks - Demo
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _      = require ( 'lodash' ),
    argv   = require ( 'yargs' ).argv,
    path   = require ( 'path' ),
    spawn  = require ( 'child_process' ).spawn,
    log    = require ( './utilities/log' ),
    gulp   = require ( 'gulp-help' )( require ( 'gulp' ) );

/* DEMO */

gulp.task ( 'demo', 'Serve the demos', ['watch'], function () {

  var demoPath = path.join ( process.cwd (), '/demo' ),
      port = !_.isNaN ( Number ( argv.port ) ) ? Number ( argv.port ) : 3333,
      bsport = !_.isNaN ( Number ( argv.bsport ) ) ? Number ( argv.bsport ) : 4444,
      uiport = !_.isNaN ( Number ( argv.uiport ) ) ? Number ( argv.uiport ) : 5555;

  var meteor = spawn ( 'meteor', ['run', '--port', port], { cwd: demoPath } );

  meteor.stdout.on ( 'data', log.buffer );
  meteor.stderr.on ( 'data', log.buffer );

  var bs = spawn ( 'browser-sync', ['start', '--port', bsport, '--ui-port', uiport, '--proxy', 'localhost:' + port, '--no-open', '--files', '**/*.html, **/*.js, **/*.css'], { cwd: demoPath } );

  bs.stdout.on ( 'data', log.buffer );
  bs.stderr.on ( 'data', log.buffer );

}, {

  aliases: ['serve-demo'],
  options: {
    'port=number': 'Demos will be available at localhost:port [default=3333]',
    'bsport=number': 'Browser-sync-enabled demos will be available at localhost:bsport [default=4444]',
    'uiport=number': 'Browser-sync\'s UI port [default=5555]'
  }

});
