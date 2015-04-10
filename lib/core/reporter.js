var Class = require( 'findhit-class' );

var Reporter = Class.extend({

    options: {

    },

    initialize: function ( options ) {
        options = this.setOptions( options );
    },

    msg: function () {
        throw new Error( "create your own msg reporter" );
    },

    error: function () {
        throw new Error( "create your own error reporter" );
    },

    raw: function () {
        throw new Error( "create your own raw reporter" );
    },

});

module.exports = Reporter;

// Connect with Snitcher
Reporter.hasOne( 'Snitcher', Snitcher );
