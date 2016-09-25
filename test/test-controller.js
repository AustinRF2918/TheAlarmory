var expect = require('chai').expect;

var TimeDisplayComponent = require('../js/time-display-component.js').TimeDisplayComponent;

describe('Properly hooks to DOM', function() {
    $ = function (){};

    it ('Should construct on demand.', function() {
	var tds = TimeDisplayComponent( "#test" );
    });

    it ('Should have internal identifiers accessable.', function() {
	var tds = TimeDisplayComponent( "#test" );
	expect( tds._DOMIdentifier != undefined ).to.be.true;
    });

    it ('Should throw when no DOM element is passed.', function() {
	expect( function() {
	  var tds = TimeDisplayComponent( );
	}).to.throw( );
    });

    it ('Should be differentiatable.', function() {
	var tdsA = TimeDisplayComponent( "#test" )._DOMIdentifier;
	var tdsB = TimeDisplayComponent( "#tesb" )._DOMIdentifier;
	console.log(tdsA);
	expect( tdsA !== tdsB ).to.be.true;
    });
});
