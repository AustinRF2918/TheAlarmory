var expect = chai.expect;

describe('Button', function() {
    describe('Properly constructs', function() {
	$ = function (){};
	var tds = SelectorButtonComponent( "#test", 0, "btn-square-hours" );
	var tdsA = SelectorButtonComponent( "#test", 1, "btn-square-hours").__DOMIdentifier;
	var tdsB = SelectorButtonComponent( "#tesb", 2, "btn-square-hours").__DOMIdentifier;

	it ('Should construct on demand.', function() {
	    var tdsAlt = SelectorButtonComponent( "#test", 0, "btn-square-hours" );
	});

	it ('Should throw when no DOM element is passed.', function() {
	    expect( function() {
	    var tdsAlt = SelectorButtonComponent( );
	    }).to.throw( );
	});

	it ('Should throw when no number element is passed.', function() {
	    expect( function() {
		var tdsAlt = SelectorButtonComponent( "#test" );
	    }).to.throw( );
	});

	it ('Should throw when no className element is passed.', function() {
	    expect( function() {
		var tdsAlt = SelectorButtonComponent( "#test", 2 );
	    }).to.throw( );
	});

	it ('Should throw when invalid numerics are passed.', function() {
	    expect( function() {
		var tdsAlt = SelectorButtonComponent( "#test", "2" );
	    }).to.throw( );
	});

	it ('Should have internal identifiers accessable.', function() {
	    expect( tds.__DOMIdentifier != undefined ).to.be.true;
	    expect( tds.__number != undefined ).to.be.true;
	});

	it ('Should be differentiatable.', function() {
	    expect( tdsA !== tdsB ).to.be.true;
	});
    });

    describe('Renders correctly.', function() {
	it ('Should render an initial, non active item.', function() {
	    var tds = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    expect(tds.__generateTemplate() === '<div id="test-0" class="btn-square-hours"><a>0</a></div>').to.be.true;
	});

	it ('Should render an active item.', function() {
	    var tds = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    tds.__pushActiveNumber( 0 );
	    expect(tds.__generateTemplate() === '<div id="test-0" class="btn-square-hours btn-square-hours-active"><a>0</a></div>').to.be.true;
	});

	it ('Should render an inactive item after being passed a non-containing numeric..', function() {
	    var tds = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    tds.__pushActiveNumber( 1 );
	    expect(tds.__generateTemplate() === '<div id="test-0" class="btn-square-hours"><a>0</a></div>').to.be.true;
	});
    });

    describe('Correctly adds actions.', function() {
	it ('Should be able to add actions to an internal stack.', function() {
	    var tds = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    tds.pushAction( function() { return tds.__number; } );
	    expect(tds.__actions[0]() === 0).to.be.true;
	});
    });
});
