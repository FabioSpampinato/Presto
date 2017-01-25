
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Top index)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./z_index.js
 * ========================================================================= */

//TODO: Use it
//TODO: Write it in a more dynamic way, detecting what the highest `z-index` actually is

(function ( $ ) {

  'use strict';

  /* TOP INDEX */

  $.fn.topIndex = function () {

    let topIndex = 1000000000;

    return function () {

      return this.zIndex ( ++topIndex );

    };

  };

}( jQuery ));
