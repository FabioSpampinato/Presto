
// @require ../init.js

(function ( $ ) {

  'use strict';

  /* EVENT NAMESPACER */

  $.eventNamespacer = function ( events, namespace ) {

    return events.split ( /\s+/ ).map ( event => event + namespace ).join ( ' ' );

  };

}( window.__svelto_jquery ));
