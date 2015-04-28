var //Promise = require( 'bluebird' ),
    Snitcher = require( '../../' ),
    GitHubReporter = Snitcher.Reporters.GitHub,

    chai = require( 'chai' ),
    expect = chai.expect;

describe( "Snitcher", function () {

    describe( "Reporter", function () {

        describe( "GitHub", function () {

            describe( "initialize errors", function () {
                var reporter;


                it( "should not allow reporter creation without providing token", function () {
                    expect(function () {
                        reporter = new GitHubReporter({
                            token: undefined,
                            user: 'test',
                            repo: 'test',
                        });
                    }).to.throw( "options.token invalid" );
                });

                it( "should not allow reporter creation without providing user", function () {
                    expect(function () {
                        reporter = new GitHubReporter({
                            token: 'test',
                            user: undefined,
                            repo: 'test',
                        });
                    }).to.throw( "options.user invalid" );
                });

                it( "should not allow reporter creation without providing repo", function () {
                    expect(function () {
                        reporter = new GitHubReporter({
                            token: 'test',
                            user: 'test',
                            repo: undefined,
                        });
                    }).to.throw( "options.repo invalid" );
                });

            });

            

        });

    });

});


/*

            beforeEach(function () {
                reporter = new Snicher.Reporter.GitHub({
                    simulate: true,

                });

                snitcher = new Snitcher({
                    reporter: reporter,
                });
            });
*/
