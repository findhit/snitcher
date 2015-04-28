var chai = require( 'chai' ),
    Promise = require( 'bluebird' ),
    DummyReporter = require( '../resources/dummy.reporter' ),
    expect = chai.expect;

describe( "Snitcher", function () {

    describe( "DummyReporter", function () {
        var reporter;

        beforeEach(function () {
            reporter = new DummyReporter({
                simulate: true,
            });
        });

        describe( 'check if all methods are returning promises', function () {

            function test ( method ) {
                it( method, function () {
                    expect( reporter[ method ]() ).is.instanceof( Promise );
                });
            }

            test( 'msg' );
            test( 'error' );
            test( 'raw' );

        });

    });

});
