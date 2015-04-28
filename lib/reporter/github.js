var Reporter = require( '../core/reporter' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    GitHub = require( 'github' );

var GitHubReporter = Reporter.extend({
    name: 'GitHub',

    options: {

        // auth options
        token: null,
        user: null,
        repo: null,

        // behavior options
        reuseOpenedIssueWithSameTitle: true,

        // GitHub package options
        debug: false,
        protocol: "https",
        timeout: 5000,

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

        // create a github instance
        var github = this._github = new GitHub({
            version: '3.0.0',

            debug: options.debug,
            protocol: options.protocol,
            timeout: options.timeout,
        });

        // authenticate
        this._github.authenticate({
            type: 'oauth',
        	token: options.token,
        });

        this.searchIssues = Promise.promisify( github.search.issues );
        this.createIssue = Promise.promisify( github.issues.create );
        this.createComment = Promise.promisify( github.issues.createComment );

    },

    msg: function ( msg ) {
        return Promise.cast( msg );
    },

    error: function ( error ) {
        return Promise.cast( error );
    },

    raw: function ( raw ) {
        return Promise.cast( raw );
    },

    _publish: function (  ) {
        var simulation = this.options.simulate;

        if ( simulation ) {
            console.log( 'simulating' );
        }

    },

});

module.exports = GitHubReporter;
