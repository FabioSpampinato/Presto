
/* =========================================================================
 * Svelto - Droppable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add a anction on hovering

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DROPPABLE */

  $.factory ( 'svelto.droppable', {

    /* OPTIONS */

    options: {
      selector: '*',
      callbacks: {
        drop: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$droppable = this.$element;

    },

    _events: function () {

      /* DRAG END */

      this._on ( $document, 'draggable:end', this.__dragEnd );

    },

    /* PRIVATE */

    __dragEnd: function ( event, data ) {

      var $draggable = $(data.draggable);

      if ( $draggable.is ( this.options.selector ) ) {

        var rect = this.$droppable.getRect (),
            eventXY = $.eventXY ( data.event ),
            pointXY = {
              X: eventXY.X - $window.scrollTop (),
              Y: eventXY.Y - $window.scrollLeft ()
            };

        if ( pointXY.X >= rect.left && pointXY.X <= rect.right && pointXY.Y >= rect.top && pointXY.Y <= rect.bottom ) {

          this._trigger ( 'drop', { draggable: data.draggable, droppable: this.element } );

        }

      }

    }

  });

  /* READY */

  $(function () {

    $('.droppable').droppable ();

  });

}( jQuery, _, window, document ));
