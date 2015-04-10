var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    Reporter = require( './core/reporter' );

var Snitcher = Class.extend({

    options: {

        // behavior options
        catchUncaughtErrors: true,

    },

    initialize: function ( options ) {
        options = this.setOptions( options );

        // Check for reporter

        if ( options.catchUncaughtErrors ) {
            this.catch( process, 'uncaughtError' );
        }
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

});

module.exports = Snitcher;

// Connect with Reporter
Snitcher.hasOne( 'Reporter', Reporter );

// Place aliases
Snitcher.addInitHook(function () {

    // We should always have a reporter
    // and report should return it
    Object.defineProperty( this, 'report', {
        enumerable: true,
        writable: false,
        get: function () {
            return this.Reporter;
        },
    });

});
