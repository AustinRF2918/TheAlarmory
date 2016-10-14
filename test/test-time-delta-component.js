var expect = require('chai').expect;

var TimeDeltaComponent = require('../js/components/time-delta.js').TimeDeltaComponent;

describe('Properly hooks to DOM', function() {
    $ = function (){};
    var tds = TimeDeltaComponent( "#test" );
    var tdsA = TimeDeltaComponent( "#test" ).__DOMIdentifier;
    var tdsB = TimeDeltaComponent( "#tesb" ).__DOMIdentifier;

    it ('Should construct on demand.', function() {
	var tdsAlt = TimeDeltaComponent( "#test" );
    });

    it ('Should throw when no DOM element is passed.', function() {
	expect( function() {
	  var tdsAlt = TimeDeltaComponent( );
	}).to.throw( );
    });

    it ('Should have internal identifiers accessable.', function() {
	expect( tds.__DOMIdentifier != undefined ).to.be.true;
    });

    it ('Should be differentiatable.', function() {
	expect( tdsA !== tdsB ).to.be.true;
    });
});

describe('Properly renders tags', function() {
    it ('Should render a proper h5 tag.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 3, 1, "AM");
	tds.__pushCurrentTime( 1, 5, "AM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">1</span></strong></h5></div>' ).to.be.true;
    });

    it ('Should (12 hour) edge cases.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 1, 0, "AM");
	tds.__pushCurrentTime( 1, 0, "PM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">12</span></strong></h5></div>' ).to.be.true;
    });

    it ('Should (12 o clock) edge cases.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 1, 0, "PM");
	tds.__pushCurrentTime( 12, 0, "AM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">1</span></strong></h5></div>' ).to.be.true;
    });

    it ('Should (12 o clock) edge cases.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 12, 0, "AM");
	tds.__pushCurrentTime( 1, 0, "PM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">23</span></strong></h5></div>' ).to.be.true;
    });

    it ('Should mid day nap function.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 6, 0, "PM");
	tds.__pushCurrentTime( 3, 0, "PM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">3</span></strong></h5></div>' ).to.be.true;
    });

    it ('Normal slumber function.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 6, 0, "AM");
	tds.__pushCurrentTime( 8, 0, "PM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">10</span></strong></h5></div>' ).to.be.true;
    });

    it ('Power nap function.', function() {
	var tds = TimeDeltaComponent( "#test" );
	tds.__pushTime( 6, 30, "AM");
	tds.__pushCurrentTime( 6, 0, "AM");
	expect( tds.__generateTemplate() === '<div id="#test"><h5 class="text-body text-extra"><strong>In: <span id="delta">0</span></strong></h5></div>' ).to.be.true;
    });
});



