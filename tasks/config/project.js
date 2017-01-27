
/* =========================================================================
 * Svelto - Tasks - Config - Project
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _        = require ( 'lodash' ),
      argv     = require ( 'yargs' ).argv,
      path     = require ( 'path' ),
      defaults = require ( './defaults' ),
      file     = require ( '../utilities/file' ),
      custom   = file.load ( path.resolve ( __dirname, '../../svelto.json' ), {} ),
      dot      = file.loadRecursive ( '.svelto.json', {} );

/* ENVIRONMENT */

const environment    = argv.environment || argv.env || dot.environment || custom.environment || defaults.environment,
      environmentKey = environment ? `environments.${environment}` : undefined;

/* PROJECT */

const project = _.merge ( {}, defaults, _.get ( defaults, environmentKey ), custom, _.get ( custom, environmentKey ), dot, _.get ( dot, environmentKey ) );

project.environment = environment;

/* EXPORT */

module.exports = project;
