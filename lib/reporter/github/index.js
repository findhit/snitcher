var Reporter = require( '../../core/reporter' ),
    Promise = require( 'bluebird' ),
    Util = require( 'findhit-util' ),
    GitHub = require( 'github' ),
    fs = require( 'fs' ),
    crypto = require( 'crypto' );

var GitHubReporter = Reporter.extend({
    name: 'GitHub',

    options: {

        // auth options
        token: null,
        user: null,
        author: null,
        repo: null,

        // behavior options
        reuseOpenedIssueWithSameTitle: true,

        // GitHub package options
        debug: false,
        protocol: "https",
        timeout: 5000,

        // debugging
        showUpSnitcherFooter: true,
        showUpProcessENV: true,

        titlePrefix: 'Snitcher report',
    },

    templates: {
        msg: fs.readFileSync( __dirname + '/templates/msg.tpl' ).toString(),
        error: fs.readFileSync( __dirname + '/templates/error.tpl' ).toString(),
        raw: fs.readFileSync( __dirname + '/templates/raw.tpl' ).toString(),
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

    generateIssueTitle: function ( data, suffix ) {
        var options = this.options;

        return [

            options.titlePrefix,

            crypto
                .createHash( 'md5' )
                .update( data.toString() )
                .digest( 'hex' )
                .substr( 0, 8 ),

            suffix ?
                ' - ' + suffix :
                ''

        ].join( ' ' ).trim();
    },

    msg: function ( msg ) {
        var title = this.generateIssueTitle( msg, 'Message' ),
            body = this.render.msg({ msg: msg });

        return this.publish( title, body );
    },

    error: function ( error ) {
        var title = this.generateIssueTitle( error, 'Error' ),
            body = this.render.error({ error: error });

        return this.publish( title, body );
    },

    raw: function ( raw ) {
        var title = this.generateIssueTitle( raw, 'RAW' ),
            body = this.render.raw({ raw: raw });

        return this.publish( title, body );
    },

    publish: function ( title, body ) {
        var options = this.options;

        if ( options.simulate ) {
            console.log( '-----------------------------' );
            console.log( 'Reporting to console instead:' );
            console.log( '-----------------------------' );
            console.log( title );
            console.log( '--' );
            console.log( body );
            return;
        }

        return options.reuseOpenedIssueWithSameTitle ?
            this.findOrCreateIssueAndComment( title, body ) :
            this.createIssueAndComment( title, body );
    },

    createIssueAndComment: function ( title, body ) {
        var options = this.options;

        return this.createIssue({
            user: options.user,
			repo: options.repo,

            title: title,
            body: body,

            milestone: null,
			labels: [],
        });
    },

    findOrCreateIssueAndComment: function ( title, body ) {
        var options = this.options,
            reporter = this;

        return this.searchIssues({
			q: [
				'author:' + options.author || options.user,
				'is:open',
				'user:'+ options.user,
				'repo:'+ options.repo,
				'"' + title + '"',
			].join(' '),
		})
        .then(function ( res ) {
            var number =
                res && res.items && res.items.length && res.items[0].number ||
                false;

            // If no issue id, lets create one
            if ( ! number ) {
                return reporter.createIssueAndComment( title, body );
            }

            // otherwise, lets comment it
            return reporter.createComment({
                number: number,
                user: options.user,
                repo: options.repo,
                body: body
            });
        });
    },

});

module.exports = GitHubReporter;
