
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (HSL)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//FIXME: I'm not sure if this plugin should exists

// It only works for setting

(function ( $ ) {

  'use strict';

  /* HSL */

  $.fn.hsl = function ( h, s, l ) {

    this[0].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;

    return this;

  };

}( jQuery ));
