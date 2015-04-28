var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    ECT = require( 'ect' ),

    debug = require( 'debug' )( 'snitcher:core:reporter' ),

    renderer = new ECT({
        cache: false,
    });

// -----------------------------------------------------------------------------

var Reporter = Class.extend({

    options: {


        /**
         * simulate
         *
         * allows you to run tests and avoid report delivering
         *
         * {Boolean}
         */
        simulate: false,


        /**
         * templates
         *
         * list of templates per method
         *
         * {Object}
         */
        templates: undefined,

    },

    templates: {

        msg: '<%- @msg %>',
        error: '<%- @error %>',
        raw: '<pre><%- JSON.stringify @raw %></pre>',

    },

    _handleTemplates: function () {
        var reporter = this,
            options = this.options;

        var templates = reporter.templates = Util.extend(
                {},
                reporter.templates,
                Util.is.Object( options.templates ) && options.templates || {}
            );

        // Now lets just map object
        reporter.render = Util.Object.map( templates, function ( template, name ) {
            debug( 'compiling template "%s"', name );
            var compiled = renderer.compile( template );

            return function ( context ) {
                context = Util.extend(
                    {},
                    Util.is.Object( context ) && context || {},
                    { reporter: reporter }
                );

                return compiled.call( context, {}, {} );
            };
        });
    },

    initialize: function ( options ) {
        options = this.setOptions( options );
    },

    msg: function () {
        throw new Error( "create your own msg reporter" );
    },

    error: function () {
        throw new Error( "create your own error reporter" );
    },

    raw: function () {
        throw new Error( "create your own raw reporter" );
    },

});

Reporter.prototype.toString =
Reporter.prototype.toJSON =
Reporter.prototype.valueOf =
    function () {
        return '[' + ( this.name + 'Reporter' || 'Reporter' ) + ' Object]';
    };

module.exports = Reporter;

// Handle .last object
Reporter.addInitHook(function () {
    this.last = {};

    // Save always last reported error
    // for that we must overlap some methods, sorry :p

        // msg
        var msgFn = this.msg;
        this.msg = function ( msg ) {
            this.last.msg = msg;
            return msgFn.apply( this, arguments );
        };

        // error
        var errorFn = this.error;
        this.error = function ( error ) {
            this.last.error = error;
            return errorFn.apply( this, arguments );
        };

        // raw
        var rawFn = this.raw;
        this.raw = function ( raw ) {
            this.last.raw = raw;
            return rawFn.apply( this, arguments );
        };
});


Reporter.addInitHook(function () {

    // Reset reporter.name
    this.name = ( this.name || '' ) + 'Reporter';

    debug( 'Initializing reporter "%s"', this.name );

});


Reporter.addInitHook(function () {
    this._handleTemplates();
});
