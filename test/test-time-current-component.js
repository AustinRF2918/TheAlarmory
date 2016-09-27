var expect = require('chai').expect;

var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var TimeCurrentComponent = require('../js/time-current-component.js').TimeCurrentComponent;

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
    console.log( tds.__generateTemplate() );

    it ('Should render a proper h5 tag when nothing is passed in', function() {
	var currentTime = new Date();
	expect( tds.__generateTemplate() === '<h5 class="text-body">Current Time: <span id="current-hour-alarm">' + TimeFormatter.formatHour( currentTime.getHours() ) + '</span>:<span id="current-minute-alarm">' + TimeFormatter.formatMinute( currentTime.getMinutes() ) + '</span><span id="current-when-alarm">' + TimeFormatter.formatPeriod( TimeFormatter.getPeriod( TimeFormatter.formatHour( currentTime.getHours() ) ) ) + '</span></h5>' ).to.be.true;
    });

    it ('Should render a proper h5 tag when refreshed', function() {
	var currentTime = new Date();
	tds.__refresh();
	expect( tds.__generateTemplate() === '<h5 class="text-body">Current Time: <span id="current-hour-alarm">' + TimeFormatter.formatHour( currentTime.getHours() ) + '</span>:<span id="current-minute-alarm">' + TimeFormatter.formatMinute( currentTime.getMinutes() ) + '</span><span id="current-when-alarm">' + TimeFormatter.formatPeriod( TimeFormatter.getPeriod( TimeFormatter.formatHour( currentTime.getHours() ) ) ) + '</span></h5>' ).to.be.true;
    });
});
