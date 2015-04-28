var chai = require( 'chai' ),
    Reporter = require( '../../lib/core/reporter' ),
    expect = chai.expect;

describe( "Snitcher", function () {

    describe( "Reporter", function () {
        var reporter;

        beforeEach(function () {
            reporter = new Reporter({
                simulate: true,
            });
        });

        describe( "check if last is being saved", function () {

            function test ( method, variable ) {
                it( "should return latest " + method, function () {

                    // Since it is firing an error, we will catch it
                    try {
                        reporter[ method ]( variable );
                    } catch ( error ) {}

                    expect( reporter.last[ method ] ).to.be.equal( variable );

                });
            }

            test( 'msg', 'test' );
            test( 'error', new Error( 'test' ) );
            test( 'raw', {
                some: 'awefull',
                object: 'just for',
                checking: 'proposes'
            });

        });

        describe( "testing templates rendering", function () {

            function test ( method, template, variable, expected ) {
                it( "should render " + method + " template as \"" + expected + "\"", function () {
                    var templates = {};

                    templates[ method ] = template;

                    var reporter = new Reporter({
                        simulate: true,
                        templates: templates,
                    });

                    console.log( reporter );

                    var result = reporter.render[ method ]( variable );

                    expect( result ).to.be.equal( expected );

                });
            }

            describe( "default templates", function () {

                test(
                    'msg',
                    undefined,
                    { msg: 'test' },
                    'test'
                );

                test(
                    'error',
                    undefined,
                    { error: new Error( 'test' ) },
                    'Error: test'
                );

                test(
                    'raw',
                    undefined,
                    { raw: 'test' },
                    '<pre>"test"<pre>'
                );

            });

        });

    });

});
