
/* =========================================================================
 * Svelto - Core - Factory
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/plugin/plugin.js
 * @require core/readify/readify.js
 * @require core/widgetize/widgetize.js
 *=========================================================================*/

(function ( $, _, Svelto, Instances, Widgets, Plugin, Readify, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* API */

    make ( Widget, config, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.makers.order.length; i < l; i++ ) {

        this.makers[this.makers.order[i]]( Widget, config, namespace, instances );

      }

    },

    unmake ( Widget, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.unmakers.order.length; i < l; i++ ) {

        this.unmakers[this.unmakers.order[i]]( Widget, namespace, instances );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'instances', 'plugin', 'ready', 'widgetize'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        config.Name = _.upperFirst ( config.name );

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        namespace[Widget.config.Name] = Widget;

      },

      instances ( Widget, config, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        instances[Widget.config.Name] = [];

      },

      plugin ( Widget ) {

        Plugin.make ( Widget );

      },

      ready ( Widget ) {

        Readify.add ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.add ( Widget );

      }

    },

    /* UNMAKERS */

    unmakers: {

      order: ['widgetize', 'ready', 'plugin', 'instances', 'namespace', 'configure'], // The order in which the unmakers will be called

      configure ( Widget ) {

        delete Widget.config.Name;
        delete Widget.config;

      },

      namespace ( Widget, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        delete namespace[Widget.config.Name];

      },

      instances ( Widget, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        _.forEachRight ( instances[Widget.config.Name], instance => instance.destroy () );

        delete instances[Widget.config.Name];

      },

      plugin ( Widget ) {

        Plugin.unmake ( Widget );

      },

      ready ( Widget ) {

        Readify.remove ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.remove ( Widget );

      }

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Widgets, Svelto.Plugin, Svelto.Readify, Svelto.Widgetize ));
