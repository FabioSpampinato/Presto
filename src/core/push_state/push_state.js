
/* =========================================================================
 * Svelto - Core - Push state
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * ========================================================================= */

// Monkey patching `history.pushState` so that it will trigger an event that we can then use to properly trigger a `route` event

(function ( $, _, Svelto, Readify, history ) {

  'use strict';

  /* PUSH STATE */

  Readify.add ( function () {

    let pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ({ state });

      }

      $.$window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify, window.history );
