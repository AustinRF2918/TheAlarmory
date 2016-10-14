var expect = require('chai').expect;
var templateWrapper = require('../js/lib/template-helpers.js').templateWrapper;

describe('Check ability of templateWrapper to assign IDs.', function() {
    it('It formats empty text.', function() {
	var tag = templateWrapper( "#test", "" );
	expect( tag === '<div id="#test"></div>' ).to.be.true;
    });

    it('Formats an empty string when no string is passed.', function() {
	var tag = templateWrapper( "#test" );
	expect( tag === '<div id="#test"></div>' ).to.be.true;
    });

    it('Formats a string.', function() {
	var tag = templateWrapper( "#test", "Hello" );
	expect( tag === '<div id="#test">Hello</div>' ).to.be.true;
    });
});
