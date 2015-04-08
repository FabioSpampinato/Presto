
/* SELECTABLE */

//TODO: add noty for actions AND/OR right click for action

//FIXME: make it workable with sorting (update after sorting since we may)

;(function ( $, window, document, undefined ) {

    $.factory ( 'selectable', {

        selector: 'tbody tr',
        not_selector: '.empty',
        selected_class: 'selected'

    }, {

        /* UTILITIES */

        _clear_selection: function () {

            if ( document.selection ) {

                document.selection.empty ();

            } else if ( window.getSelection ) {

                window.getSelection ().removeAllRanges ();

            }

        },

        _reset_vars: function () {

            this.$prev_row = false;
            this.$prev_shifted = false;
            this.$prev_dragged = false;

        },

        _get_rows: function () {

            return this.$node.find ( this.options.selector ).not ( this.options.not_selector );

        },

        /* SPECIAL */

        init: function () {

            this.$rows = this._get_rows ();

            this.$start_row = false;
            this.$end_row = false;

            this.$prev_row = false;
            this.$prev_shifted = false;
            this.$prev_dragged = false;

            this._bind_keys ();
            this._bind_mouse ();
            this._bind_others ();

        },

        ready: function () {

            $('table.selectable').selectable ();

        },

        /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

        _bind_keys: function () {

            this.$node.on ( 'mouseenter', function () {

                $document.on ( 'keydown', this._handler_keys );

            }).on ( 'mouseleave', function () {

                $document.off ( 'keydown', this._handler_keys );

            });

        },

        _handler_keys: function ( event ) {

            if ( event.ctrlKey ) { //INFO: CTRL

                if ( event.keyCode === 65 ) { //INFO: A

                    event.preventDefault ();

                    this._reset_vars ();

                    this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not

                } else if ( event.keyCode === 73 ) { //INFO: I

                    event.preventDefault ();

                    this._reset_vars ();

                    this.$rows.toggleClass ( this.options.selected_class );

                }

            }

        },

        /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

        _bind_mouse: function () {

            this.$rows.on ( 'mousedown', this._handler_mousedown );

        },

        _handler_mousedown: function ( event ) {

            if ( event.button !== 0 ) return;

            this.$start_row = $(this);

            $document.mousemove ( this._handler_mousemove );

            this.$start_row.mouseup ( this._handler_mouseup );

        },

        _handler_mousemove: function ( event ) { // DRAG

            if ( !event.ctrlKey ) return;

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            this._reset_vars ();

            this.$prev_row = this.$start_row;

            this.$start_row.toggleClass ( this.options.selected_class );

            $html.addClass ( 'dragging' );

            this.$rows.on ( 'mouseenter', this._handler_drag_mouseenter );

            $document.on ( 'mouseup', this._handler_drag_mouseup );

        },

        _handler_drag_mouseenter: function ( event ) { // DRAG HOVER

            this.$end_row = $(this);

            var start_index = this.$rows.index ( this.$start_row ),
                end_index = this.$rows.index ( this.$end_row ),
                min_index = Math.min ( start_index, end_index ),
                max_index = Math.max ( start_index, end_index );

            if ( min_index === start_index ) { // down

                min_index += 1;
                max_index += 1;

            }

            var $new_dragged = this.$rows.slice ( min_index, max_index );

            if ( this.$prev_dragged ) {

                $new_dragged.not ( this.$prev_dragged ).toggleClass ( this.options.selected_class );

                this.$prev_dragged.not ( $new_dragged ).toggleClass ( this.options.selected_class );

            } else {

                $new_dragged.toggleClass ( this.options.selected_class );

            }

            this.$prev_dragged = $new_dragged;

        },

        _handler_drag_mouseup: function ( event ) { // DRAG END

            this.$rows.off ( 'mouseenter', this._handler_drag_mouseenter );

            $document.off ( 'mouseup', this._handler_drag_mouseup );

            this.$prev_dragged = false;

            $html.removeClass ( 'dragging' );

        },

        _handler_mouseup: function ( event ) { // CLICK

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            if ( event.shiftKey ) {

                var start_index = this.$rows.index ( this.$prev_row ),
                    end_index = this.$prev_row ? this.$rows.index ( this.$start_row ) : 0,
                    min_index = Math.min ( start_index, end_index ),
                    max_index = Math.max ( start_index, end_index );

                if ( min_index === start_index ) { // down

                    min_index += 1;
                    max_index += 1;

                }

                var $new_shifted = this.$rows.slice ( min_index, max_index );

                if ( this.$prev_shifted ) {

                    $new_shifted.not ( this.$prev_shifted ).toggleClass ( this.options.selected_class );

                    this.$prev_shifted.not ( $new_shifted ).toggleClass ( this.options.selected_class );

                } else {

                    $new_shifted.toggleClass ( this.options.selected_class );

                }

                this.$prev_shifted = $new_shifted;

            } else if ( event.ctrlKey ) {

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_vars ();

                this.$prev_row = $start_row;

            } else {

                this.$rows.removeClass ( this.options.selected_class );

                this.$start_row.addClass ( this.options.selected_class );

                this._reset_vars ();

                this.$prev_row = this.$start_row;

            }

        },

        /* OTHER EVENTS */

        _bind_others: function () {

            this.$node.on ( 'change sort', this._handler_change_sort );

            this.$node.on ( 'mousedown mouseup', this._handler_clear_selection );

        },

        _handler_change_sort: function () {

            this.$rows = _get_rows ();

        },

        _handler_clear_selection: function () {

            $.defer ( this._clear_selection );

        }

    });

}( lQuery, window, document ));
