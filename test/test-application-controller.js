var expect = require('chai').expect;

var ControlPanelComponent = require('../js/control-panel-component.js').ControlPanelComponent;
var SelectorPortionComponent = require('../js/selector-portion-component.js').SelectorPortionComponent;
var SelectorButtonComponent = require('../js/selector-button-component.js').SelectorButtonComponent;
var ApplicationController = require('../js/application-controller.js').ApplicationController;
var TimeCurrentComponent = require('../js/time-current-component.js').TimeCurrentComponent;
var TimeDisplayComponent = require('../js/time-display-component.js').TimeDisplayComponent;
var TimeDeltaComponent = require('../js/time-delta-component.js').TimeDeltaComponent;

describe('Properly constructs', function() {
    $ = function (){};
    var tds = ControlPanelComponent( "control-panel" );
    var tds2 = ControlPanelComponent( "control-panel" );
    var tdsC = SelectorPortionComponent( "test", "Hours" );
    var controller = ApplicationController( );

    it ('Should construct on demand.', function() {
	var controller = ApplicationController( );
	var tdsAlt = ControlPanelComponent( "control-panel" );
    });


    it ('Should have internal children accessable.', function() {
	var controller = ApplicationController( );
	controller.pushChild( tdsC );
	expect( controller.__children.length === 1).to.be.true;
	controller.pushChild( tds2 );
	expect( controller.__children.length === 2).to.be.true;
    });
});

describe('Perform logic of querying components.', function() {
    it ('Should be able to properly find all the named components inside of its _children field (Unique item: ControlPanelComponent).', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );

	controller.pushChild(tds);

	var cpcs = controller.__getComponentMatches( 'ControlPanelComponent' );

	expect( cpcs.length === 1 ).to.be.true;
	expect( cpcs[0].__componentName === 'ControlPanelComponent').to.be.true;
    });

    it ('Should be able to properly find multiple  named components inside of its _children field. (Unique item: TimeDisplayComponent) ', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );

	var tdsAlt = TimeDisplayComponent( "#test" );

	controller.pushChild(tds);
	controller.pushChild(tdsAlt);

	var cpcs1 = controller.__getComponentMatches( 'ControlPanelComponent' );
	var cpcs2 = controller.__getComponentMatches( 'TimeDisplayComponent' );

	expect( cpcs1.length === 1 ).to.be.true;
	expect( cpcs1[0].__componentName === 'ControlPanelComponent').to.be.true;

	expect( cpcs2.length === 1 ).to.be.true;
	expect( cpcs2[0].__componentName === 'TimeDisplayComponent').to.be.true;
    });

    it ('Should be able to properly find more multiple named components inside of its _children field. (Unique item: TimeDeltaComponent) ', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );

	var tdsAlt = TimeDisplayComponent( "#test" );

	var timeDelta = TimeDeltaComponent( "#test" );

	controller.pushChild(tds);
	controller.pushChild(tdsAlt);
	controller.pushChild(timeDelta);

	var cpcs1 = controller.__getComponentMatches( 'ControlPanelComponent' );
	var cpcs2 = controller.__getComponentMatches( 'TimeDisplayComponent' );
	var cpcs3 = controller.__getComponentMatches( 'TimeDeltaComponent' );

	expect( cpcs1.length === 1 ).to.be.true;
	expect( cpcs1[0].__componentName === 'ControlPanelComponent').to.be.true;

	expect( cpcs2.length === 1 ).to.be.true;
	expect( cpcs2[0].__componentName === 'TimeDisplayComponent').to.be.true;

	expect( cpcs3.length === 1 ).to.be.true;
	expect( cpcs3[0].__componentName === 'TimeDeltaComponent').to.be.true;
    });

    it ('Should be able to properly find even more multiple named components inside of its _children field. (Unique item: TimeCurrentComponent) ', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );

	var tdsAlt = TimeDisplayComponent( "#test" );
	var timeDelta = TimeDeltaComponent( "#test" );
	var timeCurrent = TimeCurrentComponent( "#test" );

	controller.pushChild(tds);
	controller.pushChild(tdsAlt);
	controller.pushChild(timeDelta);
	controller.pushChild(timeCurrent);

	var cpcs1 = controller.__getComponentMatches( 'ControlPanelComponent' );
	var cpcs2 = controller.__getComponentMatches( 'TimeDisplayComponent' );
	var cpcs3 = controller.__getComponentMatches( 'TimeDeltaComponent' );
	var cpcs4 = controller.__getComponentMatches( 'TimeCurrentComponent' );

	expect( cpcs1.length === 1 ).to.be.true;
	expect( cpcs1[0].__componentName === 'ControlPanelComponent').to.be.true;

	expect( cpcs2.length === 1 ).to.be.true;
	expect( cpcs2[0].__componentName === 'TimeDisplayComponent').to.be.true;

	expect( cpcs3.length === 1 ).to.be.true;
	expect( cpcs3[0].__componentName === 'TimeDeltaComponent').to.be.true;

	expect( cpcs4.length === 1 ).to.be.true;
	expect( cpcs4[0].__componentName === 'TimeCurrentComponent').to.be.true;
    });
});

describe('Perform logic of querying components.', function() {
    it ('Initializes with correct data.', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 0, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 0, "btn-square-minutes" );
	tdsC.pushChild( tdsD );

	var tdsE = SelectorPortionComponent( "when-container", "AM/PM" );
	var tdsF = SelectorButtonComponent( "test", "AM", "btn-square-when", true );
	tdsE.pushChild( tdsF );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );
	tds.pushChild( tdsE );

	tdsB.__pushActiveNumber( 0 );
	tdsD.__pushActiveNumber( 0 );
	tdsF.__pushActiveNumber( "AM" );

	tdsB.__isActive();


	var tdsAlt = TimeDisplayComponent( "#test" );
	var timeDelta = TimeDeltaComponent( "#test" );
	var timeCurrent = TimeCurrentComponent( "#test" );

	controller.pushChild(tds);
	controller.pushChild(tdsAlt);
	controller.pushChild(timeDelta);
	controller.pushChild(timeCurrent);

	expect( tdsB.__isActive() === true ).to.be.true;
	expect( tdsD.__isActive() === true ).to.be.true;
	expect( tdsF.__isActive() === true ).to.be.true;
    } );

    it ('Correctly messages to selected time component.', function() {
	var controller = ApplicationController( );

	var tdsA = SelectorPortionComponent( "hour-container", "Hours" );
	var tdsB = SelectorButtonComponent( "test", 2, "btn-square-hours" );
	tdsA.pushChild( tdsB );

	var tdsC = SelectorPortionComponent( "minute-container", "Minutes" );
	var tdsD = SelectorButtonComponent( "test", 20, "btn-square-minutes" );
	tdsC.pushChild( tdsD );

	var tdsE = SelectorPortionComponent( "when-container", "AM/PM" );
	var tdsF = SelectorButtonComponent( "test", "PM", "btn-square-when", true );
	tdsE.pushChild( tdsF );

	var tds = ControlPanelComponent( "control-panel" );
	tds.pushChild( tdsA );
	tds.pushChild( tdsC );
	tds.pushChild( tdsE );

	var timeDisplay = TimeDisplayComponent( "#test" );
	var timeDelta = TimeDeltaComponent( "#test" );
	var timeCurrent = TimeCurrentComponent( "#test" );

	tdsF.__display();
	tdsB.__display();
	tdsD.__display();

	controller.pushChild(tds);
	controller.pushChild(timeDisplay);
	controller.pushChild(timeDelta);
	controller.pushChild(timeCurrent);

	tdsB.__fireEvent();
	tdsD.__fireEvent();
	tdsF.__fireEvent();

	expect( timeDisplay.__generateTemplate() === '<div id="#test"><h3 class="text-body text-extra"><strong>At <span id="hour-alarm">2</span><span id="exxtra">:</span><span id="minute-alarm">20</span><span id="when-alarm">PM</span></strong></h3></div>' ).to.be.true;
    } );
});
