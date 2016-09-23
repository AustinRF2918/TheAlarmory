/**
 * Function for automatically generating numerical validation conditions
 * and throwing in certain cases
 * a numerified result.
 * @function
 * @param { ErrorType } errorType - Defined error type to throw in case 
 * call back is not satisfied
 * @param { Function } callback - What will be our specific condition to throw.
 */
function _numericalValidationFn( errorType, callback ) {

    return function ( number, msg ) {
	if (isNaN( Number( number ) ) ) {
	    throw new TypeError( msg );
	} 

	number = Number( number );

	if ( callback && callback( number )) {
	    throw new errorType( msg );
	} else {
	    return Number( number );
	}
    };
}

/**
 * Function for automatically vertifying that a string (or number) is
 * a numeric. If it can not be, it will throw, otherwise it will return
 * a numerified result.
 * @function
 * @param {number or string} number - Number to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
var _validateNumeric = _numericalValidationFn( TypeError );

// Simple utility function, takes val, for a value,
// min for a minimum value, and max for a maximum value
// and tells us if our numeric is in range.
function _inRange( val, min, max ) {
    return ( ( val >= min ) && ( val < max ) );
}

// Simple utility function, takes val and tells us if
// it is a decimal.
function _isDecimal( val ) {
    return !( val % 1 );
}
/**
 * Function for automatically vertifying that a string (or number) is
 * in a 24 hour range.
 * @function
 * @param {number or string} hour - Hour to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
var _check24HourRange = _numericalValidationFn( RangeError, function( hour ) {
    return ( !_inRange( hour, 0, 24 ) || !_isDecimal( hour ) );
});

/**
 * Function for automatically vertifying that a string (or number) is
 * in a 12 hour range.
 * @function
 * @param {number or string} hour - Hour to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
var _check12HourRange = _numericalValidationFn( RangeError, function( hour ) {
    return ( !_inRange( hour, 0, 12 ) || !_isDecimal( hour ) );
});

/**
 * Function for automatically vertifying that a string (or number) is
 * in a hour (in minutes) range.
 * @function
 * @param {number or string} minute - Minute to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
var _checkMinuteRange = _numericalValidationFn( RangeError, function( minute ) {
    return ( !_inRange( minute, 0, 60 ) || !_isDecimal( minute ) );
});

/**
 * Function utilized by _formatHour to format the hour in the case that 
 * it was a numerical string. Contains interior logic for beautiful 
 * formatting for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 * @param {string} region - The region which can be American or anything 
 * else.
 */
function _formatHourAsString( hour ) {
    _validateNumeric( hour,  "Bad value passed to format hour." );
    hour = _check12HourRange( hour, "Invalid range passed to format hour." ).toString();

    if ( hour === "0" || hour === "00" || hour === "" || hour === null )  {
	hour = "12";
    }
    
    return _convertUnitToDigital( hour );
};


/**
 * Function utilized by _formatHour to format the hour in the case that 
 * it was a string. Contains interior logic for beautiful formatting 
 * for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 * @param {string} region - The region which can be American or anything 
 * else.
 */
var _formatHourAsNumber = function( hour ) {
    hour = _validateNumeric( hour,  "Bad value passed to format hour as number." ).toString();
    return _convertUnitToDigital( hour );
};

/**
   Alias of formatHourAsString to retain same API.
 */
var _formatHour = _formatHourAsString;

/**
 * Function utilized by _formatMinute to format the minute in the case that 
 * a numerical string was passed. Contains interior logic for beautiful 
 * formatting for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 */
var _formatMinuteAsString = function(minute) {
    _validateNumeric( minute,  "Bad value passed to format minute as string." );
    minute = _checkMinuteRange( minute, "Bad range value passed to _formatMinuteAsString, must be between 0 and 60 and nondecimal." ).toString();
    return _convertUnitToDigital( minute );
};

/**
 * A internal method for formatting minutes: basically if the minute is below,
 * 10, it will add a zero to make it look digital.
 * @function
 * @param {number or string} minute - The minute which we are passing to be 
 * formatted as a number or string.
 */
var _formatMinute = _formatMinuteAsString; 


/**
 * An internal method for converting AM/PM in conjunction with hours into
 * 24 hour millitary times
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 * @param {string} period - The AM/PM parameter which will assist in
 * generating a millitary time.
 */
var _convertNumericToMillitary = function( hour, period ) {
    _validateNumeric( hour,  "Bad value passed to convert numberic to millitary." );
    hour = _check12HourRange( hour, "Bad range value passed to convert numeric to millitary." );

    if ( period !== "PM" && period !== "AM" ) {
	throw RangeError( "Invalid period passed to _convertNumericToMillitary" );
    }

    period === "PM" ? hour += 12 : null;
    return hour;
};


/**
 * Converts a millitary time to a nonformal 12 hour format. This function
 * IS lossy, so watch out if you wish to retain the period information.
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 */
var _convertMillitaryToNumeric = function( hour ) {
    _validateNumeric( hour,  "Bad value passed to convert millitary to numeric." );
    hour = _check24HourRange( hour, "Invalid range passed to format hour." );
    return hour % 12;
};


/**
 * Converts a (potentially) nondigital number to digital
 * @function
 * @param {number} timeUnit - The unit which we are passing to be 
 * converted to digital appearance.
 */
var _convertUnitToDigital = function( timeUnit ) {
    timeUnit = _validateNumeric( timeUnit,  "Bad value passed to _convertUnitToDigital." ).toString();
    if (timeUnit.length > 2) {
	throw new RangeError( "Units passed to _convertUnitToDigital must be 1 or 2 digits long." );
    } else if ( timeUnit.length === 2 ) {
	return timeUnit;
    } else if ( timeUnit.length === 1 ) {
	return '0' + timeUnit;
    } else {
	throw "An unknown error occurred. Error 1";
    }
};

/**
 * A internal method for convertin AM/PM in conjunction with hours into
 * 24 hour millitary times
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 * @param {string} period - The AM/PM parameter which will assist in
 * generating a millitary time.
 */
var _calculateDelta = function( currentHours, currentMinutes, setHours, setMinutes ) {
    _validateNumeric( currentHours,  "Bad value passed to argument 1 of calculate delta." );
    _validateNumeric( currentMinutes,  "Bad value passed to argument 2 of calculate delta." );
    _validateNumeric( setHours,  "Bad value passed to argument 3 of calculate delta." );
    _validateNumeric( setMinutes,  "Bad value passed to argument 4 of calculate delta." );

    currentHours = _check24HourRange( currentHours, "Invalid range passed to argument 1 of calculate delta." );
    currentMinutes = _checkMinuteRange( currentMinutes, "Invalid range passed to argument 2 of currentHours." );
    setHours = _check24HourRange( setHours, "Invalid range passed to argument 3 of calculate delta." );
    setMinutes = _checkMinuteRange( setMinutes, "Invalid range passed to argument 4 of currentHours." );

    if ( currentHours < setHours ) {
	if ( setMinutes >= currentMinutes ) {
	    return setHours - currentHours;
	} else {
	    return setHours - currentHours - 1;
	}
    } else if ( currentHours > setHours )  {
	if ( setMinutes >= currentMinutes )  {
	    return ( 24 - (currentHours - setHours ));
	} else {
	    return ( 24 - (currentHours - setHours + 1 ));
	}
    } else {
	if ( setMinutes >= currentMinutes ) { 
	    return 0;
	} else if ( setMinutes < currentMinutes ) {
	    return 23;
	} 
    }

    throw "An unknown error occurred. Error 2";
};

/**
 * A static object for being able to call methods without the instanciation
 * of an object.
 * @function
 */
function TimeFormatter(){};

/**
 * Binding to a static function for use in our main JavaScript file.
 */
TimeFormatter.formatMinute = _formatMinute;
TimeFormatter.formatHour = _formatHour;
TimeFormatter.convertNumericToMillitary = _convertNumericToMillitary;
TimeFormatter.convertMillitaryToNumeric = _convertMillitaryToNumeric;
TimeFormatter.convertUnitToDigital = _convertUnitToDigital;
TimeFormatter.calculateDelta = _calculateDelta;

module.exports._formatHourAsString = _formatHourAsString;
module.exports._formatHour = _formatHourAsString;
module.exports._formatMinute = _formatMinute;
module.exports._convertNumericToMillitary = _convertNumericToMillitary;
module.exports._convertMillitaryToNumeric = _convertMillitaryToNumeric;
module.exports._convertUnitToDigital = _convertUnitToDigital;
module.exports._calculateDelta = _calculateDelta;
