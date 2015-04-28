var //Promise = require( 'bluebird' ),
    Snitcher = require( '../../' ),
    GitHubReporter = Snitcher.Reporter.GitHub,

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

            var token = process.env.SNITCHER_GITHUB_TOKEN,
                user = process.env.SNITCHER_GITHUB_USER,
                repo = process.env.SNITCHER_GITHUB_REPO;

            describe( "testing using env account data", function () {
                var snitcher;

                beforeEach(function () {
                    snitcher = new Snitcher({
                        reporter: new Snitcher.Reporter.GitHub({
                            token: token || 'simulating',
                            user: user || 'simulating',
                            repo: repo || 'simulating',
                            simulate: ! ( token && user && repo ),
                        }),
                        handleUncaughtExceptions: false,
                    });
                });

                it( "should publish an issue with a message", function () {
                    return snitcher.report.msg( 'YOLO' );
                });

                it( "should publish an issue with an error", function () {
                    return snitcher.report.error( new Error( 'YOLO' ) );
                });

                it( "should publish an issue with some raw shit", function () {
                    return snitcher.report.raw({
                        hey: 'you',
                        'why': 'the f*ck',
                        'are': "you",
                        reading: 'this',
                        'number': 0
                    });
                });

            });

        });

    });

});
