
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
var _formatHourAsString = function(hour) {

    if (isNaN(Number(hour))) {
	throw new TypeError("Bad value passed to format minute.");
    }

    if (Number(hour) > 11 || Number(hour) < 0 || Number(hour) % 1 != 0) {
	throw new RangeError("Bad range value passed to _formatHourAsString, must be between 0 and 11 and nondecimal.");
    }

    if (typeof hour === 'number')
	hour = _formatHourAsNumber(hour);

    if (hour === "0")
	return "12";
    else if (hour === "00")
	return "12";

    else if (hour.length !== 2)
	return "0" + hour;
    else
        return hour;
};

//module.exports._formatHourAsString = _formatHourAsString;

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
    var stringifiedHour = hour.toString();

    if (stringifiedHour.length < 2)
	return "0" + stringifiedHour;
    else 
	return stringifiedHour;
};

/**
   Alias of formatHourAsString to retain same API.
 */

var _formatHour = _formatHourAsString;
//module.exports._formatHour = _formatHourAsString;

/**
 * Function utilized by _formatMinute to format the minute in the case that 
 * a numerical string was passed. Contains interior logic for beautiful 
 * formatting for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 */

var _formatMinuteAsString = function(minute) {
    if (isNaN(Number(minute)))
	throw new TypeError("Bad value passed to format minute.");

    if (Number(minute) > 59 || Number(minute) < 0 || Number(minute) % 1 != 0)
	throw new RangeError("Bad range value passed to _formatMinuteAsString, must be between 0 and 60 and nondecimal.");

    if (typeof minute === 'number') 
	minute = minute.toString();

    if (minute.length < 2)
	return "0" + minute;
    else 
	return minute;
};

/**
 * A internal method for formatting minutes: basically if the minute is below,
 * 10, it will add a zero to make it look digital.
 * @function
 * @param {number or string} minute - The minute which we are passing to be 
 * formatted as a number or string.
 */
var _formatMinute = _formatMinuteAsString; 

//module.exports._formatMinute = _formatMinute;

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
    if (isNaN(Number(hour)))
	throw new TypeError("Bad value passed to _convertNumericToMillitary.");
    else
	var numerifiedHour = Number(hour);

    if (numerifiedHour > 11 || numerifiedHour < 0 || numerifiedHour % 1 != 0)
	throw new RangeError("Bad range value passed to _convertNumericToMillitary, must be between 0 and 11 and nondecimal.");

    if (period !== "PM" && period !== "AM")
	throw RangeError("Invalid period passed to _convertNumericToMillitary");

    if (period === "PM")
	return Number(hour) + 12;
    else
	return Number(hour);
};

//module.exports._convertNumericToMillitary = _convertNumericToMillitary;

/**
 * Converts a millitary time to a nonformal 12 hour format. This function
 * IS lossy, so watch out if you wish to retain the period information.
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 */
var _convertMillitaryToNumeric = function( hour ) {
    if (isNaN(Number(hour)))
	throw new TypeError("Bad value passed to _convertMillitaryToNumeric.");
    else
	var numerifiedHour = Number(hour);

    if (numerifiedHour > 23 || numerifiedHour < 0 || numerifiedHour % 1 != 0)
	throw new RangeError("Bad range value passed to _convertMillitaryToNumeric, must be between 0 and 23 and nondecimal.");

    return hour % 12;
};

//module.exports._convertMillitaryToNumeric = _convertMillitaryToNumeric;

/**
 * Converts a (potentially) nondigital number to digital
 * @function
 * @param {number} timeUnit - The unit which we are passing to be 
 * converted to digital appearance.
 */
var _convertUnitToDigital = function( timeUnit ) {
    if (isNaN(Number( timeUnit )))
	throw new TypeError("Bad value passed to _convertUnitToDigital.");
    else
	var numerifiedUnit = Number( timeUnit ).toString();

    if (numerifiedUnit.length > 2) 
	throw new RangeError("Units passed to _convertUnitToDigital must be 1 or 2 digits long.");

    if ( numerifiedUnit.length === 2 )
	return numerifiedUnit;
    else if (numerifiedUnit.length === 1)
	return '0' + numerifiedUnit;
    else 
	throw "An unknown exception occured (bad length";
};

//module.exports._convertUnitToDigital = _convertUnitToDigital;

var _calculateDelta = function( currentHours, currentMinutes, setHours, setMinutes ) {
    if (currentHours < setHours) {
	if (setMinutes >= currentMinutes) 
	  var deltaHours = setHours - currentHours;
        else
	  var deltaHours = setHours - currentHours - 1;
    }
    else if (currentHours > setHours)  {
	if (setMinutes >= currentMinutes) 
	  var deltaHours = 24 - (currentHours - setHours);
        else
	  var deltaHours = 24 - (currentHours - setHours + 1);
    }
    else {
	if (setMinutes >= currentMinutes) 
	    var deltaHours = 0;
	if (setMinutes < currentMinutes)
	    var deltaHours = 23;
    }

    return deltaHours;
};

//module.exports._calculateDelta = _calculateDelta;

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

