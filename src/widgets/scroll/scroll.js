
/* =========================================================================
 * Svelto - Widgets - _ - Scroll
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/pointer/pointer.js
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 * ========================================================================= */

//FIXME: It doesn't work if the layout is body, it also need html in some browsers (Which browsers?)
//TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff

(function ( $, _, Svelto, Widgetize, Pointer, Animations ) {

  'use strict';

  /* SCROLL TO TOP */

  Widgetize.add ( '.scroll-to-top', function ( $scroller ) {

    let $layout = $scroller.parent ().closest ( '.layout, body' ); // `body` is used as a fallback

    $scroller.on ( Pointer.tap, function () {

      $layout.animate ( { scrollTop: 0 }, Animations.normal );

    });

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.Pointer, Svelto.Animations ));
