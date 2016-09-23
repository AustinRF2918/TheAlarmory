/**
 * Function for automatically vertifying that a string (or number) is
 * a numeric. If it can not be, it will throw, otherwise it will return
 * a numerified result.
 * @function
 * @param {number or string} number - Number to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
function _validateNumeric(number, msg) {
    if (isNaN(Number(number)))
	throw new TypeError(number);
    else
	return Number(number);
}
/**
 * Function for automatically vertifying that a string (or number) is
 * in a 24 hour range.
 * @function
 * @param {number or string} hour - Hour to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
function _check24HourRange(hour, msg) {
    if (Number(hour) > 23 || Number(hour) < 0 || Number(hour) % 1 != 0)
	throw new RangeError(msg);
    else
	return Number(hour);
}

/**
 * Function for automatically vertifying that a string (or number) is
 * in a 12 hour range.
 * @function
 * @param {number or string} hour - Hour to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
function _check12HourRange(hour, msg) {
    if (Number(hour) > 11 || Number(hour) < 0 || Number(hour) % 1 != 0)
	throw new RangeError(msg);
    else
	return Number(hour);
}

/**
 * Function for automatically vertifying that a string (or number) is
 * in a hour (in minutes) range.
 * @function
 * @param {number or string} minute - Minute to be validated
 * @param {string} msg - Message to throw if number is not valid
 */
function _checkMinuteRange(minute, msg) {
    if (Number(minute) > 59 || Number(minute) < 0 || Number(minute) % 1 != 0)
	throw new RangeError(msg);
    else
	return Number(minute);
}

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
function _formatHourAsString(hour) {
    var stringifiedHour = _validateNumeric(hour,  "Bad value passed to format hour.").toString();
    _check12HourRange(hour, "Invalid range passed to format hour.");

    if (stringifiedHour === "0" || hour === "00")  {
	return "12";
    } else {
	return _convertUnitToDigital(stringifiedHour);
    }
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
var _formatHourAsNumber = function(hour) {
    _validateNumeric(hour,  "Bad value passed to format hour as number.");
    hour = hour.toString();

    return _convertUnitToDigital(hour);
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
    _validateNumeric(minute,  "Bad value passed to format minute as string.");
    _checkMinuteRange(minute, "Bad range value passed to _formatMinuteAsString, must be between 0 and 60 and nondecimal.");
    minute = minute.toString();

    return _convertUnitToDigital(minute);
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
 * A internal method for convertin AM/PM in conjunction with hours into
 * 24 hour millitary times
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 * @param {string} period - The AM/PM parameter which will assist in
 * generating a millitary time.
 */
var _convertNumericToMillitary = function( hour, period ) {
    _validateNumeric(hour,  "Bad value passed to convert numberic to millitary.");
    var hour = Number(hour);
    _check12HourRange(hour, "Bad range value passed to convert numeric to millitary.");

    if (period !== "PM" && period !== "AM") {
	throw RangeError("Invalid period passed to _convertNumericToMillitary");
    }

    if (period === "PM") {
	return Number(hour) + 12;
    } else {
	return Number(hour);
    }
};


/**
 * Converts a millitary time to a nonformal 12 hour format. This function
 * IS lossy, so watch out if you wish to retain the period information.
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 */
var _convertMillitaryToNumeric = function( hour ) {
    _validateNumeric(hour,  "Bad value passed to convert millitary to numeric.");
    var hour = Number(hour);
    _check24HourRange(hour, "Invalid range passed to format hour.");

    return hour % 12;
};


/**
 * Converts a (potentially) nondigital number to digital
 * @function
 * @param {number} timeUnit - The unit which we are passing to be 
 * converted to digital appearance.
 */
var _convertUnitToDigital = function( timeUnit ) {
    _validateNumeric(timeUnit,  "Bad value passed to _convertUnitToDigital.");
    var timeUnit = Number( timeUnit ).toString();

    if (timeUnit.length > 2) 
	throw new RangeError("Units passed to _convertUnitToDigital must be 1 or 2 digits long.");
    else if ( timeUnit.length === 2 )
	return timeUnit;
    else if (timeUnit.length === 1)
	return '0' + timeUnit;
    else 
	return _convertUnitToDigital(timeUnit);
};


var _calculateDelta = function( currentHours, currentMinutes, setHours, setMinutes ) {
    currentHours = _validateNumeric(currentHours,  "Bad value passed to argument 1 of calculate delta.");
    currentMinutes = _validateNumeric(currentMinutes,  "Bad value passed to argument 2 of calculate delta.");
    setHours = _validateNumeric(setHours,  "Bad value passed to argument 3 of calculate delta.");
    setMinutes = _validateNumeric(setMinutes,  "Bad value passed to argument 4 of calculate delta.");

    _check24HourRange(currentHours, "Invalid range passed to argument 1 of calculate delta.");
    _checkMinuteRange(currentMinutes, "Invalid range passed to argument 2 of currentHours.");
    _check24HourRange(setHours, "Invalid range passed to argument 3 of calculate delta.");
    _checkMinuteRange(setMinutes, "Invalid range passed to argument 4 of currentHours.");

    if (currentHours < setHours) {
	if (setMinutes >= currentMinutes) {
	    return setHours - currentHours;
	} else {
	    return setHours - currentHours - 1;
	}
    } else if (currentHours > setHours)  {
	if (setMinutes >= currentMinutes)  {
	    return (24 - (currentHours - setHours));
	} else {
	    return (24 - (currentHours - setHours + 1));
	}
    } else {
	if (setMinutes >= currentMinutes) { 
	    return 0;
	} else if (setMinutes < currentMinutes) {
	    return 23;
	} 
    }
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
