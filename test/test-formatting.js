var expect = require('chai').expect;

var _formatHour = require('../js/lib/time-formatting.js')._formatHour;
var _formatMinute = require('../js/lib/time-formatting.js')._formatMinute;
var _formatPeriod = require('../js/lib/time-formatting.js')._formatPeriod;
var _getPeriod = require('../js/lib/time-formatting.js')._getPeriod;
var _convertHourToMillitary = require('../js/lib/time-formatting.js')._convertHourToMillitary;
var _convertMillitaryToHour = require('../js/lib/time-formatting.js')._convertMillitaryToHour;
var _convertUnitToDigital = require('../js/lib/time-formatting.js')._convertUnitToDigital;
var _calculateDelta = require('../js/lib/time-formatting.js')._calculateDelta;

describe('Formats hours as strings', function() {
    it('Should format edge cases in various regions.', function() {
	expect(_formatHour("11") == "11").to.be.true;
	expect(_formatHour("0") == "12").to.be.true;
	expect(_formatHour("1") == "01").to.be.true;
	expect(_formatHour("6") == "06").to.be.true;
    });

    it ('Should format double digit strings.', function() {
	expect(_formatHour("11") == "11").to.be.true;
	expect(_formatHour("10") == "10").to.be.true;
    });

    it ('Should easily convert from number to string as well.', function() {
	expect(_formatHour(1) == "01").to.be.true;
	expect(_formatHour(7) == "07").to.be.true;
    });

    it ('Should have same result for numeric and string up to 10.', function() {
	for ( let i = 0; i < 10; i++ ) {
	    expect(_formatHour(i) === _formatHour(i.toString())).to.be.true;
	}
    });

    it ('Should have same result for numeric and string up to 10 to 12.', function() {
	for ( let i = 10; i < 12; i++ ) {
	    expect(_formatHour(i) === _formatHour(i.toString())).to.be.true;
	}
    });

    it ('Should throw on any value greater than 11.', function() {
	expect(function(){_formatHour(12)}).to.throw(RangeError);
	expect(function(){_formatHour(13)}).to.throw(RangeError);
	expect(function(){_formatHour(-1)}).to.throw(RangeError);
    });

    it ('Should throw on any value greater than 11 and decimals (strings).', function() {
	expect(function(){_formatHour("12")}).to.throw(RangeError);
	expect(function(){_formatHour("13")}).to.throw(RangeError);
	expect(function(){_formatHour("-1")}).to.throw(RangeError);
	expect(function(){_formatHour("11.2")}).to.throw(RangeError);
	expect(function(){_formatHour("0.1")}).to.throw(RangeError);
    });

    it ('Should throw type errors.', function() {
	expect(function(){_formatHour("A")}).to.throw(TypeError);
	expect(function(){_formatHour("5A")}).to.throw(TypeError);
	expect(function(){_formatHour("Bob")}).to.throw(TypeError);
    });


    it ('Should throw on any value greater not an integer.', function() {
	expect(function(){_formatHour(11.2)}).to.throw(RangeError);
	expect(function(){_formatHour(0.1)}).to.throw(RangeError);
    });
});

describe('Minute formatting functions work.', function() {
    it( 'Should properly do edge case minutes.', function() {
	expect(_formatMinute("0") == "00").to.be.true;
	expect(_formatMinute("59") == "59").to.be.true;
	expect(_formatMinute("30") == "30").to.be.true;
    });

    it( 'Should convert numerics to formatted minutes.', function() {
	expect(_formatMinute(0) == "00").to.be.true;
	expect(_formatMinute(9) == "09").to.be.true;
	expect(_formatMinute(45) == "45").to.be.true;
	expect(_formatMinute(59) == "59").to.be.true;
    });

    it ('Should throw on any value greater or less than (59, 0).', function() {
	expect(function(){_formatMinute(60)}).to.throw(RangeError);
	expect(function(){_formatMinute(120)}).to.throw(RangeError);
	expect(function(){_formatMinute(-1)}).to.throw(RangeError);
	expect(function(){_formatMinute(-120)}).to.throw(RangeError);
    });

    it ('Should throw on any value that is a decimal.', function() {
	expect(function(){_formatMinute(30.2)}).to.throw(RangeError);
	expect(function(){_formatMinute(10.2)}).to.throw(RangeError);
	expect(function(){_formatMinute(-1.1)}).to.throw(RangeError);
	expect(function(){_formatMinute(-120.1)}).to.throw(RangeError);
    });

    it ('Should throw type errors.', function() {
	expect(function(){_formatMinute("A")}).to.throw(TypeError);
	expect(function(){_formatMinute("5A")}).to.throw(TypeError);
	expect(function(){_formatMinute("Bob")}).to.throw(TypeError);
    });
});

describe('Converting numeric to millitary should function.', function() {

    it ('Should throw type errors for invalid numerics.', function() {
	expect(function(){_convertHourToMillitary("A", "AM")}).to.throw(TypeError);
    });

    it ('Should throw range errors for period.', function() {
	expect(function(){_convertHourToMillitary(0, "LM")}).to.throw(RangeError);
	expect(function(){_convertHourToMillitary(0, "AM")}).to.not.throw(RangeError);
	expect(function(){_convertHourToMillitary(0, "PM")}).to.not.throw(RangeError);
    });

    it ('Should throw range errors for hour.', function() {
	expect(function(){_convertHourToMillitary(-1, "AM")}).to.throw(RangeError);
	expect(function(){_convertHourToMillitary(0, "AM")}).to.not.throw(RangeError);
	expect(function(){_convertHourToMillitary(11, "AM")}).to.not.throw(RangeError);
	expect(function(){_convertHourToMillitary(12, "PM")}).to.throw(RangeError);
	expect(function(){_convertHourToMillitary(100, "PM")}).to.throw(RangeError);
    });

    it ('Should convert to PM (via string) properly.', function() {
	for (let i = 0; i < 12; i++)
	  expect(_convertHourToMillitary(i, "PM") === i + 12).to.be.true;
    });

    it ('Should convert to AM (via string) properly.', function() {
	for (let i = 0; i < 12; i++)
	  expect(_convertHourToMillitary(i, "AM") === i).to.be.true;
    });

    it ('Should convert to PM (via string) properly.', function() {
	for (let i = 0; i < 12; i++)
	    expect(_convertHourToMillitary(i.toString(), "PM") === i + 12).to.be.true;
    });

    it ('Should convert to AM (via string) properly.', function() {
	for (let i = 0; i < 12; i++)
	    expect(_convertHourToMillitary(i.toString(), "AM") === i).to.be.true;
    });
});

describe('Converting millitary to numeric should function.', function() {
    it ('Should throw type errors for invalid numerics.', function() {
	expect(function(){_convertMillitaryToHour("A")}).to.throw(TypeError);
	expect(function(){_convertMillitaryToHour(1)}).to.not.throw(TypeError);
	expect(function(){_convertMillitaryToHour("1")}).to.not.throw(TypeError);
    });

    it ('Should throw range errors for hour.', function() {
	expect(function(){_convertMillitaryToHour(-1)}).to.throw(RangeError);
	expect(function(){_convertMillitaryToHour(0)}).to.not.throw(RangeError);
	expect(function(){_convertMillitaryToHour(23)}).to.not.throw(RangeError);
	expect(function(){_convertMillitaryToHour(24)}).to.throw(RangeError);
	expect(function(){_convertMillitaryToHour(100)}).to.throw(RangeError);
    });

    it ('Should convert general numerics.', function() {
	for (let i = 0; i < 11; i++)
	  expect(_convertMillitaryToHour(i) === i).to.be.true;

	for (let i = 12; i < 24; i++)
	  expect(_convertMillitaryToHour(i) === i - 12).to.be.true;
    });

    it ('Should convert general numerics (string).', function() {
	for (let i = 0; i < 11; i++)
	    expect(_convertMillitaryToHour(i.toString()) === i).to.be.true;

	for (let i = 12; i < 24; i++)
	    expect(_convertMillitaryToHour(i.toString()) === i - 12).to.be.true;
    });
});

describe('Should convert units to digital', function() {
    it ('Should throw type errors for invalid numerics.', function() {
	expect(function(){_convertUnitToDigital("A")}).to.throw(TypeError);
	expect(function(){_convertUnitToDigital("1A")}).to.throw(TypeError);
	expect(function(){_convertUnitToDigital(1)}).to.not.throw(TypeError);
    });

    it ('Should throw range errors for larger numerics.', function() {
	expect(function(){_convertUnitToDigital("111")}).to.throw(RangeError);
	expect(function(){_convertUnitToDigital(121)}).to.throw(RangeError);
	expect(function(){_convertUnitToDigital(1)}).to.not.throw(TypeError);
    });

    it ('Should properly convert all numbers to 100.', function() {
	for (let i = 0; i < 10; i++)
	    expect(_convertUnitToDigital(i) === "0" + i).to.be.true;

	for (let i = 10; i < 100; i++)
	    expect(_convertUnitToDigital(i) === i.toString()).to.be.true;

	expect(function(){_convertUnitToDigital(101)}).to.throw(RangeError);

    });
});

describe('Calculating deltas should function.', function() {
    it ('Should throw type errors for invalid numerics.', function() {
	expect(function(){_calculateDelta("A", 1, 1, 1)}).to.throw(TypeError);
	expect(function(){_calculateDelta(1, "A", 1, 1)}).to.throw(TypeError);
	expect(function(){_calculateDelta(1, 1, "A", 1)}).to.throw(TypeError);
	expect(function(){_calculateDelta(1, 1, 1, "A")}).to.throw(TypeError);
    });

    it ('Should throw range errors for all arguments.', function() {
	expect(function(){_calculateDelta(25, 1, 1, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(-1, 1, 1, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(5, 1, 1, 1)}).to.not.throw(RangeError);

	expect(function(){_calculateDelta(1, 1, 25, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, 1, -25, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, 1, 1, 1)}).to.not.throw(RangeError);

	expect(function(){_calculateDelta(1, 61, 1, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, -1, 1, 1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, 1, 1, 1)}).to.not.throw(RangeError);

	expect(function(){_calculateDelta(1, 1, 1, 64)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, 1, 1, -1)}).to.throw(RangeError);
	expect(function(){_calculateDelta(1, 1, 1, 1)}).to.not.throw(RangeError);
    });

    it ('Should properly compute simple hours. (next day.)', function() {
	for (let i = 0; i < 22; i++) {
	    expect(_calculateDelta( 22, 2, i, 2 )).to.equal(2 + i);
	}
    });

    it ('Should properly compute simple hours. (today.)', function() {
	for (let i = 2; i < 22; i++) {
	    expect(_calculateDelta( 1, 2, i, 2 )).to.equal(i - 1);
	}
    });

    it ('Should properly compute 0 hours.', function() {
	expect(_calculateDelta( 1, 2, 1, 2 )).to.equal(0);
	expect(_calculateDelta( 1, 2, 1, 3 )).to.equal(0);
	expect(_calculateDelta( 1, 2, 2, 1 )).to.equal(0);
    });

    it ('Should properly compute 24 hours.', function() {
	expect(_calculateDelta( 1, 2, 1, 1 )).to.equal(23);
    });

    it ('Should properly compute range hours.', function() {
	for ( let i = 2; i < 23 ; i++) {
	    expect(_calculateDelta( 1, 2, i, 1 )).to.equal(i - 2);
	}
    });

    it ('Should properly compute range hours.', function() {
	for ( let i = 0; i < 23 ; i++) {
	    expect(_calculateDelta( 23, 2, i, 1 )).to.equal(i);
	}
    });
});

describe('AM and PM formatter should function.', function() {
    it ('Should throw type errors for invalid strings.', function() {
	expect( function() {
	    _formatPeriod( 213 );
	}).to.throw(TypeError);
    });

    it ('Should throw type errors for invalid strings.', function() {
	expect( function() {
	    _formatPeriod( "FS" );
	}).to.throw(TypeError);
    });

    it ('Should format all AMs properly.', function() {
	expect( _formatPeriod( "am" ) == "AM" );
	expect( _formatPeriod( "AM" ) == "AM" );
	expect( _formatPeriod( "aM" ) == "AM" );
	expect( _formatPeriod( "Am" ) == "AM" );
	expect( _formatPeriod( "a" ) == "AM" );
	expect( _formatPeriod( "A" ) == "AM" );
    });

    it ('Should format all PMs properly.', function() {
	expect( _formatPeriod( "pm" ) == "PM" );
	expect( _formatPeriod( "PM" ) == "PM" );
	expect( _formatPeriod( "pM" ) == "PM" );
	expect( _formatPeriod( "Pm" ) == "PM" );
	expect( _formatPeriod( "P" ) == "PM" );
	expect( _formatPeriod( "p" ) == "PM" );
    });
});


describe('Should be able to extract periods from hours.', function() {
    it ('Should throw type errors for invalid numerics.', function() {
	expect(function(){_getPeriod("A")}).to.throw(TypeError);
	expect(function(){_getPeriod(1)}).to.not.throw(TypeError);
	expect(function(){_getPeriod("1")}).to.not.throw(TypeError);
    });

    it ('Should throw range errors for hour.', function() {
	expect(function(){_getPeriod(-1)}).to.throw(RangeError);
	expect(function(){_getPeriod(0)}).to.not.throw(RangeError);
	expect(function(){_getPeriod(23)}).to.not.throw(RangeError);
	expect(function(){_getPeriod(24)}).to.throw(RangeError);
	expect(function(){_getPeriod(100)}).to.throw(RangeError);
    });


    it ('Should properly get all AM numerics.', function() {
	for ( let i = 0; i < 13; i++ ) {
	    expect( _getPeriod(i) == "AM" ).to.be.true;
	}
    });

    it ('Should properly get all PM numerics.', function() {
	for ( let i = 13; i < 24; i++ ) {
	    expect( _getPeriod(i) == "PM" ).to.be.true;
	}
    });
});
