
/* =========================================================================
 * Svelto - Mouse
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* MOUSE */

  let Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;

}( Svelto.$, Svelto._, Svelto ));
