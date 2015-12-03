
/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlay',
    selector: '.overlay',
    templates: {
      base: false
    },
    options: {
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      classes: {
        show: 'show',
        open: 'open'
      },
      selectors: {
        trigger: '.overlay-trigger',
        closer: '.overlay-closer'
      },
      animations: {
        open: Svelto.animation.fast,
        close: Svelto.animation.fast
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* OVERLAY */

  class Overlay extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlay = this.$element;
      this.$overlayed = this.$overlay.parent ();

      this.$triggers = this.$overlayed.find ( this.options.selectors.trigger );
      this.$closers = this.$overlayed.find ( this.options.selectors.closer );

      this._isOpen = this.$overlay.hasClass ( this.options.classes.open );

    }

    _events () {

      /* TRIGGER */

      this._on ( this.$triggers, Pointer.tap, this.open );

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

      /* HOVER */

      if ( this.options.hover.triggerable ) {

        this._on ( this.$overlayed, Pointer.enter, this.__hoverEnter );

      }

    }

    /* HOVER */

    __hoverEnter () {

      if ( !this._isOpen ) {

        this._isHoverOpen = false;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( this.$overlayed, Pointer.leave, this.__hoverLeave );

      }

    }

    __hoverOpen () {

      if ( !this._isOpen ) {

        this.open ();

        this._isHoverOpen = true;

        this._hoverOpenTimeout = false;

      }

    }

    __hoverLeave () {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

      }

    }

    __hoverClose () {

      if ( this._isHoverOpen ) {

        this.close ();

        this._isHoverOpen = false;

        this._hoverCloseTimeout = false;

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        if ( force === true ) {

          this.$overlay.addClass ( this.options.classes.show );

        }

        this._frame ( function () { //INFO: Needed since `spinnerOverlay` may attach the overlay and then request to open it, if those things happen in the same frame we won't see the animation

          this._isOpen = force;

          this.$overlay.toggleClass ( this.options.classes.open, this._isOpen );

          if ( !this._isOpen ) {

            this._delay ( function () {

              this.$overlay.removeClass ( this.options.classes.show );

            }, this.options.animations.close );

          }

          this._trigger ( this._isOpen ? 'open' : 'close' );

        });

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* BINDING */

  Svelto.Overlay = Overlay;
  Svelto.Overlay.config = config;

  /* FACTORY */

  $.factory ( Svelto.Overlay );

}( Svelto.$, Svelto._, window, document ));
