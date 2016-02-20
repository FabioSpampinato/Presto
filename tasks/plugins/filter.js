
/* =========================================================================
 * Svelto - Tasks - Plugins - Filter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _            = require ( 'lodash' ),
    path         = require ( 'path' ),
    streamfilter = require ( 'streamfilter' ),
    project      = require ( '../config/project' ),
    components   = []; //project.components.map ( function ( component ) { return component.split ( '/' ); } );

/* FILTER */

var filter = function () {

  return streamfilter ( function ( file, encoding, callback ) {

    var relative = file.relative;

    if ( relative.indexOf ( path.sep ) === -1 ) return callback ( false );

    var parts = path.dirname ( relative ).split ( path.sep ),
        pl = parts.length;

    for ( var i = 0, l = components.length; i < l; i++ ) {

      var component = components[i],
          cl = component.length;

      if ( pl > cl && _.isEqual ( parts.slice ( 0, cl ), component ) ||
           pl < cl && _.isEqual ( parts, component.slice ( 0, pl ) ) ||
           pl === cl && _.isEqual ( parts, component ) ) {

        return callback ( false );

      }

    }

    callback ( true );

  }, {

    objectMode: true

  });

};

/* EXPORT */

module.exports = filter;
