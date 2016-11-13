var expect = chai.expect;

describe('Current Time Display', function() {
    describe('Properly hooks to DOM', function() {
	$ = function (){};
	var tds = TimeCurrentComponent( "#test" );
	var tdsA = TimeCurrentComponent( "#test" ).__DOMIdentifier;
	var tdsB = TimeCurrentComponent( "#tesb" ).__DOMIdentifier;

	it ('Should construct on demand.', function() {
	    var tdsAlt = TimeCurrentComponent( "#test" );
	});

	it ('Should throw when no DOM element is passed.', function() {
	    expect( function() {
	    var tdsAlt = TimeCurrentComponent( );
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
	var tds = TimeCurrentComponent( "#test" );

	it ('Should render a proper h5 tag when nothing is passed in', function() {
	    var currentTime = new Date();
	    expect( tds.__generateTemplate()  ).to.equal('<div id="#test"><h5 class="text-body">Current Time: <span id="current-hour-alarm">' + TimeFormatter.convertUnitToDigital( TimeFormatter.convertMillitaryToHour( currentTime.getHours() ) ) + '</span>:<span id="current-minute-alarm">' + TimeFormatter.formatMinute( currentTime.getMinutes() ) + '</span><span id="current-when-alarm">' + TimeFormatter.getPeriod( currentTime.getHours() ) + '</span></h5></div>');
	});

	it ('Should render a proper h5 tag when refreshed', function() {
	    var currentTime = new Date();
	    tds.__refresh();
	    expect( tds.__generateTemplate()  ).to.equal('<div id="#test"><h5 class="text-body">Current Time: <span id="current-hour-alarm">' + TimeFormatter.convertUnitToDigital( TimeFormatter.convertMillitaryToHour( currentTime.getHours() ) ) + '</span>:<span id="current-minute-alarm">' + TimeFormatter.formatMinute( currentTime.getMinutes() ) + '</span><span id="current-when-alarm">' + TimeFormatter.getPeriod( currentTime.getHours() ) + '</span></h5></div>');
	});
    });
});
