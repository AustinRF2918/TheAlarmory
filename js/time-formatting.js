
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
var _formatHourAsString = function(hour, region) {
    if (hour == "0" && region == "American") {
	return "12";
    }

    if (hour == "00" && region == "American") {
	return "12";
    }

    if (hour.length != 2) {
	return "0" + hour;
    }

    return hour;
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
var _formatHourAsNumber = function(hour, region) {

    if (hour === 0 && region === "American") {
	return "12";
    }

    if (hour.toString().length != 2) {
	return "0" + hour;
    }

    return hour.toString();
};

/**
 * A internal method for formatting hours: basically if the hour is zero,
 * and the region is america, it will be printed american style.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 * @param {string} region - The region which can be American or anything 
 * else.
 */

var _formatHour = function(hour, region) {
    if (typeof hour === "string") {
	return _formatHourAsString(hour, region);
    } else if (typeof hour === "number") {
	return _formatHourAsNumber(hour, region);
    } else {
	return null;
    }
};

/**
 * Function utilized by _formatMinute to format the minute in the case that 
 * a numerical string was passed. Contains interior logic for beautiful 
 * formatting for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 */

var _formatMinuteAsString = function(minute) {
    if (minute.length != 2) {
	return "0" + minute;
    } else {
	return minute;
    }
};

/**
 * Function utilized by _formatMinute to format the minute in the case that 
 * it a string was passed. Contains interior logic for beautiful 
 * formatting for use in the view.
 * @function
 * @param {number or string} hour - The hour which we are passing to be 
 * formatted as a number or string.
 */
var _formatMinuteAsNumeric = function(minute) {
    if (minute.toString().length != 2) {
	return "0" + minute;
    } else {
	return minute.toString();
    }
};

/**
 * A internal method for formatting minutes: basically if the minute is below,
 * 10, it will add a zero to make it look digital.
 * @function
 * @param {number or string} minute - The minute which we are passing to be 
 * formatted as a number or string.
 */
var _formatMinute = function(minute) {
    if (typeof minute === "string") {
	return _formatMinuteAsString(minute);
    } else if (typeof minute === "number") {
	return _formatMinuteAsNumeric(minute);
    } else {
	return null;
    }

    return minute;
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
var _convertNumericToMillitary = function( hour, period ) {
	if (period == "PM") {
	    return Number(hour) + 12;
	} else if (period == "AM") {
	    return Number(hour);
	}
    return null;
};

/**
 * Converts a millitary time to a nonformal 12 hour format. This function
 * IS lossy, so watch out if you wish to retain the period information.
 * @function
 * @param {number} hour - The hour which we are passing to be 
 * converted to millitary time.
 */
var _convertMillitaryToNumeric = function( hour ) {
    return hour % 12;
};

/**
 * Converts a (potentially) nondigital number to digital
 * @function
 * @param {number} timeUnit - The unit which we are passing to be 
 * converted to digital appearance.
 */
var _convertUnitToDigital = function( timeUnit ) {
    if ( timeUnit.toString().length == 1 ) {
	return "0" + timeUnit.toString();;
    } else {
	return timeUnit.toString();
    }

    return null;
};

var _calculateDelta = function( millitaryNumber, currentHours, cMinutes, sMinutes) {
    if (millitaryNumber < currentHours) {
	return 24 - (Number(currentHours) - millitaryNumber);
    } else if (millitaryNumber === currentHours) {
	if (Number(cMinutes) < Number(sMinutes)){
	  if (sMinutes - cMinutes < 30) {
	    return millitaryNumber - Number(currentHours);
	  } else {
	    return 1;
	  }

	} else {
	    if (millitaryNumber - currentHours < 30 ) {
		return 0;
	    } else {
		return 24 - (Number(currentHours) - millitaryNumber);
	    }
	}
    } else {
	return millitaryNumber - Number(currentHours);
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

