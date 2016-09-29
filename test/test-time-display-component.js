var expect = require('chai').expect;

var TimeDisplayComponent = require('../js/time-display-component.js').TimeDisplayComponent;

describe('Properly hooks to DOM', function() {
    $ = function (){};
    var tds = TimeDisplayComponent( "#test" );
    var tdsA = TimeDisplayComponent( "#test" ).__DOMIdentifier;
    var tdsB = TimeDisplayComponent( "#tesb" ).__DOMIdentifier;

    it ('Should construct on demand.', function() {
	var tdsAlt = TimeDisplayComponent( "#test" );
    });

    it ('Should throw when no DOM element is passed.', function() {
	expect( function() {
	  var tdsAlt = TimeDisplayComponent( );
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
    var tds = TimeDisplayComponent( "#test" );
    it ('Should render a proper h3 tag when nothing is passed in', function() {
	expect( tds.__generateTemplate() === '<div id="#test"><h3 class="text-body text-extra"><strong>At <span id="hour-alarm">12</span><span id="exxtra">:</span><span id="minute-alarm">00</span><span id="when-alarm">AM</span></strong></h3></div>' ).to.be.true;
    });

    it ('Should render a proper h3 tag when stuff is passed in', function() {
	tds.__pushTime( 2, 5, "AM" );
	expect( tds.__generateTemplate() === '<div id="#test"><h3 class="text-body text-extra"><strong>At <span id="hour-alarm">02</span><span id="exxtra">:</span><span id="minute-alarm">05</span><span id="when-alarm">AM</span></strong></h3></div>' ).to.be.true;
    });

    it ('Should properly render PMs', function() {
	tds.__pushTime( 2, 5, "PM" );
	expect( tds.__generateTemplate() === '<div id="#test"><h3 class="text-body text-extra"><strong>At <span id="hour-alarm">02</span><span id="exxtra">:</span><span id="minute-alarm">05</span><span id="when-alarm">PM</span></strong></h3></div>' ).to.be.true;
    });

    it ('Should throw with improper period arguments.', function() {
	expect( function() {
	  tds.__pushTime( 2, 5, "STDT" );
	}).to.throw();
    });

});








