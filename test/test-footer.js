var expect = chai.expect;

describe('Full Footer', function() {
    describe('Properly constructs', function() {
	it ('Should construct on demand.', function() {
	    var footer = FooterComponent( "page-footer" );
	    expect
	});

	it ('Should throw when no DOM element is passed.', function() {
	    expect( function() {
		var tdsAlt = ControlPanelComponent( );
	    }).to.throw( );
	});

	it ('Should not throw when invalid numerics are passed.', function() {
	    expect( function() {
		var tdsAlt = ControlPanelComponent( 2 );
	    }).to.throw( );
	});

	it ('Should have internal identifiers accessable.', function() {
	    expect( tds.__DOMIdentifier != undefined ).to.be.true;
	});

	it ('Should be differentiatable.', function() {
	    expect( tds !== tds2 ).to.be.true;
	});
    });

    describe('Renders correctly.', function() {
	it ('Should be able to render an empty component.', function() {
	    var tds = ControlPanelComponent( "control-panel" );
	    expect( tds.__generateTemplate() === '<div class="col-md-8" id="control-panel"></div>' ).to.be.true;
	});

	it ('Should be able to add a generic renderable component and render it alongside.', function() {
	    var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	    var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    var tds = ControlPanelComponent( "control-panel" );
	    tdsA.pushChild( tdsB );
	    tds.pushChild( tdsA );

	    expect( tds.__generateTemplate() === '<div class="col-md-8" id="control-panel"><div class="row"><h3 class="text-body">Hours</h3></div><div class="row"><div class="square-container"><div id="test-0" class="btn-square-hours"><a>0</a></div></div></div></div>' ).to.be.true;

	});

	it ('Should be able to render multiple generic components.', function() {
	    var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	    var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	    tdsA.pushChild( tdsB );

	    var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	    var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );
	    tdsC.pushChild( tdsD );

	    var tds = ControlPanelComponent( "control-panel" );
	    tds.pushChild( tdsA );
	    tds.pushChild( tdsC );

	    expect( tds.__generateTemplate() === '<div class="col-md-8" id="control-panel"><div class="row"><h3 class="text-body">Hours</h3></div><div class="row"><div class="square-container"><div id="test-0" class="btn-square-hours"><a>0</a></div></div></div><div class="row"><h3 class="text-body">Minutes</h3></div><div class="row"><div class="square-container"><div id="test-0" class="btn-square-minutes"><a>0</a></div></div></div></div>' ).to.be.true;

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
});
