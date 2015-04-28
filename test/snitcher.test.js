var Snitcher = require( '../' ),
    DummyReporter = require( './resources/dummy.reporter'),

    chai = require( 'chai' ),
    expect = chai.expect;

describe( "Snitcher", function () {
    var snitcher;

    describe( "initialize errors", function () {

        it( "should not construct if reporter isn't provided", function () {
            expect(function () {
                return new Snitcher();
            }).to.throw( TypeError );
        });

        it( "should not construct if reporter isn't available", function () {
            expect(function () {
                return new Snitcher({
                    reporter: 'something_cool'
                });
            }).to.throw( TypeError );
        });

        it( "should not construct if reporter isn't valid type", function () {
            expect(function () {
                return new Snitcher({
                    reporter: { iAmA: 'reporter' },
                });
            }).to.throw( TypeError );
        });

    });

    describe( "check if reporter is working flawless", function () {
        var reporter;

        beforeEach(function () {
            reporter = new DummyReporter();
            snitcher = new Snitcher({
                reporter: reporter,
            });
        });

        it( "should have reporter accessible from .Reporter", function () {
            expect( snitcher.Reporter ).to.be.equal( reporter );
        });

        it( "should have reporter accessible from .report", function () {
            expect( snitcher.report ).to.be.equal( reporter );
        });

    });


});
