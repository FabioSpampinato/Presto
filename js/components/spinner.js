
/* SPINNER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'spinner', {

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' ),
            this.$label = this.$node.find ( '.label' ),
            this.$decrease_btn = this.$node.find ( '.decrease' ),
            this.$increase_btn = this.$node.find ( '.increase' ),

            this.min = this.$node.data ( 'min' ),
            this.max = this.$node.data ( 'max' ),
            this.start = this.$node.data ( 'start' ) || this.$input.val () || 0,
            this.step = this.$node.data ( 'step' ) || 1,
            this.decimals = this.$node.data ( 'decimals' ) || 0,

            this.current_value = start;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_arrows ();
            this._bind_minus_click ();

        },

        ready: function () {

            $('.spinner').spinner ();

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(value).toFixed ( this.decimals );

        },

        /* CHANGE */

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function () {

            var input_val = Number(this.$input.val ());

            if ( input_val === this.current_value ) return;

            this.current_value = input_val;

            this.set_value ( this.current_value );

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$node.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                this.navigate ( - this.step );

            } else if ( event.keyCode === 39 ) { // right arrow

                this.navigate ( this.step );

            }

        },

        /* MINUS / PLUS CLICK */

        _bind_minus_click: function () {

            this.$decrease_btn.on ( 'click', this._handler_minus_click );

        },

        _handler_minus_click: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( - this.step );

        },

        _bind_plus_click: function () {

            this.$increase_btn.on ( 'click', this._handler_plus_click );

        },

        _handler_plus_click: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( this.step );

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            this.$input.val ( value ).trigger ( 'change' );
            this.$label.html ( value );

            this.$decrease_btn.toggleClass ( 'inactive', value === this.min );
            this.$increase_btn.toggleClass ( 'inactive', value === this.max );


        },

        navigate: function ( modifier ) {

            var possible_new_value = this.current_value + modifier;

            if ( possible_new_value >= this.min && possible_new_value <= this.max ) {

                this.current_value = possible_new_value;

                this.set_value ( this.current_value );

            }

        }

    });

}( lQuery, window, document ));
