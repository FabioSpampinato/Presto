
// @require ../init.js

(function ( _ ) {

  'use strict';

  /* FORMAT */

  _.mixin ({

    format ( msg, ...args ) {

      for ( let i = 1, l = args.length; i <= l; i++ ) {

        msg = msg.replace ( `$${i}`, args[i - 1] );

      }

      return msg;

    }

  });

}( window.__svelto_lodash ));
