
/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobar',
    selector: '.infobar',
    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close () {}
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$infobar = this.$element;
      this.$closers = this.$infobar.find ( this.options.selectors.closer );

    }

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    }

    /* API */

    close () {

      //INFO: Maybe just detach it, so that we can open it again

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  }

  /* BINDING */

  Svelto.Infobar = Infobar;
  Svelto.Infobar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Infobar );

}( Svelto.$, Svelto._, window, document ));
