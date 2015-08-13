
/* EASING */

//TODO: stripe out the stupid ones

//INFO: t: current time,
//      b: start value,
//      c: end value,
//      d: duration

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* EASING */

    $.easing = {
        def: 'easeOutQuad',
        linear: function ( t, b, c, d ) {
            return ( c - b ) / d * t + b;
        },
        easeInQuad: function ( t, b, c, d ) {
            return c * ( t /= d ) * t + b;
        },
        easeOutQuad: function ( t, b, c, d ) {
            return -c * ( t /= d ) * ( t - 2 ) + b;
        },
        easeInOutQuad: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
            return -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
        },
        easeInCubic: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t + b;
        },
        easeOutCubic: function ( t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
        },
        easeInOutCubic: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t + 2 ) + b;
        },
        easeInQuart: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t * t + b;
        },
        easeOutQuart: function ( t, b, c, d ) {
            return -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
        },
        easeInOutQuart: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t + b;
            return -c / 2 * ( ( t -= 2 ) * t * t * t - 2 ) + b;
        },
        easeInQuint: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t * t * t + b;
        },
        easeOutQuint: function ( t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
        },
        easeInOutQuint: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
        },
        easeInSine: function ( t, b, c, d ) {
            return -c * Math.cos ( t / d * ( Math.PI / 2 ) ) + c + b;
        },
        easeOutSine: function ( t, b, c, d ) {
            return c * Math.sin ( t / d * ( Math.PI / 2 ) ) + b;
        },
        easeInOutSine: function ( t, b, c, d ) {
            return -c / 2 * ( Math.cos ( Math.PI * t / d ) - 1 ) + b;
        },
        easeInExpo: function ( t, b, c, d ) {
            return ( t == 0 ) ? b : c * Math.pow ( 2, 10 * ( t / d - 1 ) ) + b;
        },
        easeOutExpo: function ( t, b, c, d ) {
            return ( t == d ) ? b + c : c * ( -Math.pow ( 2, -10 * t / d ) + 1) + b;
        },
        easeInOutExpo: function ( t, b, c, d ) {
            if ( t == 0) return b;
            if ( t == d) return b + c;
            if ( ( t /= d / 2 ) < 1) return c / 2 * Math.pow ( 2, 10 * ( t - 1 ) ) + b;
            return c / 2 * ( -Math.pow ( 2, -10 * --t ) + 2 ) + b;
        }
    };

}( jQuery, _, window, document ));
