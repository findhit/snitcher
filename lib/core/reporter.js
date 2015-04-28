var Class = require( 'findhit-class' ),
    Util = require( 'findhit-util' ),
    ECT = require( 'ect' ),

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
        return '[ ' + ( this.name || 'Reporter' ) + ' Object ]';
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

// Handle template rendering
var defaultTemplates = {

    tplMsg: '<%- @msg+"" %>',
    tplError: '<%- @error+"" %>',
    tplRaw: '<pre><%- JSON.stringify @raw %></pre>',

};

Reporter.addInitHook(function () {
    var reporter = this,
        templates;

    templates =
        Util.is.Object( reporter.options.templates ) && reporter.options.templates ||
        {};

    // prototype template :p
    templates = Util.extend( {}, defaultTemplates, templates );

    // Now lets just map object
    this.render = Util.Object.map( templates, function ( template ) {
        return renderer.compile( template );
    });

});
