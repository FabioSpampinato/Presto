
/* =========================================================================
 * Svelto - Widgets - Remote - Action
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require core/colors/colors.js
 * @require core/sizes/sizes.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities (Disable the ability to trigger the same action multiple times simultaneously)
//TODO: Add support for customizable `confirmation` option //TODO: Update also `selectable actions`

//FIXME: Not well written, maybe try to extend RemoteWidget, even though it was ment for a different kind of widgets
//FIXME: Clicking an error/success toast doesn't close it

(function ( $, _, Svelto, Widgets, Factory, Colors, Sizes ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteAction',
    options: {
      closingDelay: Widgets.Toast.config.options.ttl / 2,
      ajax: {
        cache: false,
        method: 'POST'
      },
      confirmation: { // Options to pass to a confirmation toast, if falsy or `buttons.length === 0` we won't ask for confirmation. If a button as `isConfirmative` it will be used for confirmation, otherwise the last one will be picked
        body: 'Execute action?',
        buttons: [{
          text: 'Cancel'
        }, {
          text: 'Execute',
          color: Colors.secondary,
          isConfirmative: true
        }]
      },
      messages: {
        success: 'Done! A page refresh may be needed',
        refreshing: 'Done! Refreshing the page...',
        redirecting: 'Done! Redirecting...'
      },
      classes: {
        spinner: {
          color: Colors.white,
          size: Sizes.small,
          css: '',
        }
      }
    }
  };

  /* REMOTE ACTION */

  class RemoteAction extends Widgets.Remote {

    /* TOAST */

    ___confirmationToast () {

      if ( this.$toast ) return;

      /* VARIABLES */

      let options = _.cloneDeep ( this.options.confirmation ),
          index = _.findIndex ( options.buttons, 'isConfirmative' ),
          button = ( index >= 0 ) ? options.buttons[index] : _.last ( options.buttons );

      /* ON CLICK */

      let _prevOnClick = button.onClick,
          instance = this;

      button.onClick = function () {

        instance.request ( true );

        if ( _.isFunction ( _prevOnClick ) ) {

          _prevOnClick.apply ( this, arguments );

        }

        return false;

      };

      /* OPENING */

      this._replaceToast ( options );

    }

    ___loadingToast () {

      this._replaceToast ( `<svg class="spinner ${this.options.classes.spinner.color} ${this.options.classes.spinner.size} ${this.options.classes.spinner.css}"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg>` );

    }

    _replaceToast ( options ) {

      let instance = $.toast ( _.isString ( options ) ? { body: options, autoplay: false } : _.extend ( {}, options, { autoplay: false } ) );

      instance.close ();

      let $toast = instance.$element;

      if ( this.$toast ) {

        this.$toast.html ( $toast.html () ).widgetize ();

      } else {

        this.$toast = $toast;

        this.$toast.toast ( 'open' );

      }

    }

    _destroyToast ( delay ) {

      if ( !this.$toast ) return;

      this._delay ( function () {

        this.$toast.toast ( 'close' );

        this._delay ( function () {

          this.$toast.remove ();

          this.$toast = false;

        }, Widgets.Toast.config.options.animations.close );

      }, delay ? this.options.closingDelay : 0 );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this.___loadingToast ();

      super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      this._replaceToast ( _.isError ( resj ) || !('message' in resj) ? this.options.messages.error : resj.message );

      this._destroyToast ( true );

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( !_.isError ( resj ) ) {

        if ( resj.refresh || resj.url === window.location.href || ( _.isString ( resj.url ) && _.trim ( resj.url, '/' ) === _.trim ( window.location.pathname, '/' ) ) ) {

          this._replaceToast ( resj.message || this.options.messages.refreshing );

          location.reload ();

        } else if ( resj.url ) {

          // In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

          this._replaceToast ( resj.message || this.options.messages.redirecting );

          location.assign ( resj.url );

        } else {

          this._replaceToast ( resj.message || this.options.messages.success );

        }

      } else {

        this._replaceToast ( this.options.messages.success );

      }

      this._destroyToast ( true );

      super.__success ( res );

    }

    /* API OVERRIDES */

    request ( _confirmation ) {

      if ( !_confirmation && this.options.confirmation && 'buttons' in this.options.confirmation && this.options.confirmation.buttons.length ) {

        this.___confirmationToast ();

      } else {

        super.request ();

      }

    }

    abort () {

      this._destroyToast ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.make ( RemoteAction, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Sizes ));
