var Reporter = require( '../../lib/core/reporter' ),
    Promise = require( 'bluebird' );

var DummyReporter = Reporter.extend({

    msg: function ( msg ) {
        return Promise.cast( msg );
    },

    error: function ( error ) {
        return Promise.cast( error );
    },

    raw: function ( raw ) {
        return Promise.cast( raw );
    },

});

module.exports = DummyReporter;
