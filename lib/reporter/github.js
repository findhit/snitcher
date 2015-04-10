var Reporter = require( '../core/reporter' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    GitHub = require( 'github' );

module.exports = Reporter.extend({

    options: {

        // auth options
        token: null,
        user: null,
        repo: null,

        // behavior options
        reuseIssuesWithSameTitle: true,

        // GitHub package options
        debug: false,
        protocol: "https",
        timeout: 5000,

        // delivering templates
        // TODO: use ect engine? or es6 templating?

    },

    initialize: function ( options ) {
        options = this.setOptions( options );

        // check for token
        if ( ! options.token || Util.isnt.String( options.token ) ) {
            throw new TypeError( "options.token invalid" );
        }

        // check for user
        if ( ! options.user || Util.isnt.String( options.user ) ) {
            throw new TypeError( "options.user invalid" );
        }

        // check for repo
        if ( ! options.repo || Util.isnt.String( options.repo ) ) {
            throw new TypeError( "options.repo invalid" );
        }
    },

});
