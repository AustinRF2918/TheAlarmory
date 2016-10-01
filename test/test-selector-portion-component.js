var expect = require('chai').expect;

var SelectorPortionComponent = require('../js/selector-portion-component.js').SelectorPortionComponent;
var SelectorButtonComponent = require('../js/selector-button-component.js').SelectorButtonComponent;

describe('Properly constructs', function() {
    $ = function (){};
    var tds = SelectorPortionComponent( "#test", "Hours" );
    var tdsA = SelectorPortionComponent( "#test", "Minutes" ).__DOMIdentifier;
    var tdsB = SelectorPortionComponent( "#tesb", "AM/PM" ).__DOMIdentifier;

    it ('Should construct on demand.', function() {
	var tdsAlt = SelectorPortionComponent( "#test", "Hours", "btn-square-hours" );
    });

    it ('Should throw when no DOM element is passed.', function() {
	expect( function() {
	  var tdsAlt = SelectorPortionComponent( );
	}).to.throw( );
    });

    it ('Should throw when no number element is passed.', function() {
	expect( function() {
	    var tdsAlt = SelectorPortionComponent( "#test" );
	}).to.throw( );
    });

    it ('Should throw when no className element is passed.', function() {
	expect( function() {
	    var tdsAlt = SelectorPortionComponent( "#test", 2 );
	}).to.throw( );
    });

    it ('Should not throw when invalid numerics are passed.', function() {
	expect( function() {
	    var tdsAlt = SelectorPortionComponent( "#test", "2" );
	}).to.not.throw( );
    });

    it ('Should have internal identifiers accessable.', function() {
	expect( tds.__DOMIdentifier != undefined ).to.be.true;
    });

    it ('Should be differentiatable.', function() {
	expect( tdsA !== tdsB ).to.be.true;
    });
});

describe('Renders correctly.', function() {
    it ('Should be able to render an empty component.', function() {
	var tds = SelectorPortionComponent( "hour-container", "Hours" );
	expect( tds.__generateTemplate() === '<div class="row"><h3 class="text-body">Hours</h3></div><div class="row"><div class="square-container"></div></div>' ).to.be.true;
    });

    it ('Should be able to add a generic renderable component and render it alongside.', function() {
	var tds = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsAlt = SelectorButtonComponent( "test", 0, "btn-square-hours" );

	expect(tdsAlt.__generateTemplate() === '<div id="test-0" class="btn-square-hours"><a>0</a></div>').to.be.true;
	tds.pushChild( tdsAlt );
	expect( tds.__generateTemplate() === '<div class="row"><h3 class="text-body">Hours</h3></div><div class="row"><div class="square-container"><div id="test-0" class="btn-square-hours"><a>0</a></div></div></div>' ).to.be.true;

    });

    it ('Should be able to render multiple generic components.', function() {
	var tds = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsA = SelectorButtonComponent( "testa", 0, "btn-square-hours-0" );
	var tdsB = SelectorButtonComponent( "testb", 1, "btn-square-hours-1" );

	expect(tdsA.__generateTemplate() === '<div id="testa-0" class="btn-square-hours-0"><a>0</a></div>').to.be.true;
	tds.pushChild( tdsA );
	tds.pushChild( tdsB );
	expect( tds.__generateTemplate() === '<div class="row"><h3 class="text-body">Hours</h3></div><div class="row"><div class="square-container"><div id="testa-0" class="btn-square-hours-0"><a>0</a></div><div id="testb-1" class="btn-square-hours-1"><a>1</a></div></div></div>' ).to.be.true;
    });
});

describe('Performs component logic.', function() {
    it ('Should be able to determine that after an action fires, something is active..', function() {
	var tds = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsList = [];

	for (var i = 0; i < 12; i++) {
	    tdsList.push(SelectorButtonComponent( "#testa-" + i, i, "btn-square-hours" ));
	}

	for ( var i = 0; i< tdsList.length; i++ ) {
	    tds.pushChild(tdsList[i]);
	}

	tdsList[1].__fireEvent();
	tdsList[0].__fireEvent();
    });
});
