var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    Reporter = require( './core/reporter' ),
    Reporters = require( './reporter' );

var Snitcher = Class.extend({

    // Exposure
    statics: {
        Reporter: Reporters,
        Core: {
            Reporter: Reporter,
        }
    },

    options: {

        /**
         * reporter
         *
         * here you should provide a string or instanceof Reporter
         *
         * {String|Reporter}
         */
        reporter: undefined,

        // behavior options
        handleUncaughtExceptions: true,

    },

    initialize: function ( options ) {
        options = this.setOptions( options );

        this._handleReporter();

        if ( options.handleUncaughtExceptions ) {
            this.catch( process, 'uncaughtException' );
        }
    },

    middleware: function () {
        var snitcher = this;

        return function ( message, req, res, next ) {
            // report error message
            snitcher.report.error( message );

            // flow error message into next on queue
            next( message );
        };
    },

    catch: function ( obj, eventName ) {
        var snitcher = this;

        // detect if object is a kind of event emitter
        if (
            ! obj ||
            ( ! obj.on || ! obj.once )
        ) {
            throw new TypeError( "obj isn't eventual" );
        }

        // init eventName
        eventName = Util.is.String( eventName ) && eventName || 'error';

        obj.on( eventName, function ( message ) {
            snitcher.report.error( message );
        });
    },

    _handleReporter: function () {
        var options = this.options,
            reporter = options.reporter;

        reporter =
            reporter instanceof Reporter && reporter ||
            Util.is.String( reporter ) && Reporters[ reporter ] &&
                new Reporters[ reporter ]( options ) ||
            false;

        if ( ! reporter ) {
            throw new TypeError( "options.reporter is required" );
        }

        Object.defineProperty( this, 'Reporter', {
            enumerable: true,
            writable: false,
            value: reporter,
        });

        Object.defineProperty( this, 'report', {
            enumerable: true,
            writable: false,
            value: reporter,
        });

    },

});

module.exports = Snitcher;
