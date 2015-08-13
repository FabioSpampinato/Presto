
/* FORM AJAX */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* FORM AJAX */

    $.fn.formAjax = function () {

        this.on ( 'submit', function ( event ) {

            var $form = $(this);

            event.preventDefault (); //FIXME: Does it work?

            $.ajax ({
                type: $form.attr ( 'method' ) || 'POST',
                url: $form.attr ( 'action' ),
                data: new FormData ( this ),
                before: function () {
                    $form.loading ( true );
                },
                after: function () {
                    $form.loading ( false );
                },
                success: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res === 'refresh' ) {

                            $.noty ( 'Done! Refreshing the page...' );

                            location.reload ();

                        } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { //INFO: Is an url, either absolute or relative

                            if ( res === window.location.href || res === window.location.pathname ) {

                                $.noty ( 'Done! Refreshing the page...' );

                                location.reload ();

                            } else {

                                $.noty ( 'Done! Redirecting...' );

                                location.assign ( res );

                            }

                        } else if ( res[0] === '<') { //INFO: Is HTML

                            $.noty ( 'Done! A page refresh may be needed to see the changes' );

                            $body.append ( res );

                        } else {

                            $.noty ( res );

                        }

                    } else {

                        noty ( 'Done! A page refresh may be needed to see the changes' );

                    }

                },
                error: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res[0] === '<' ) { //INFO: Is HTML

                            $.noty ( 'There was an error, please try again or report the problem' );

                            $body.append ( res );

                        } else {

                            $.noty ( res );

                        }

                    } else {

                        $.noty ( 'There was an error, please try again or report the problem' );

                    }

                }
            });

        });

    };

    /* READY */

    $(function () {

        $('form.ajax').formAjax ();

    });

}( jQuery, _, window, document ));
