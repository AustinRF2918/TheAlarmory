
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
    if (hour.asString().length != 2) {
	return "0" + hour;
    }

    return hour.asString();
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

var _formatMinute = function(minute) {
    if (typeof minute === "string") {
	return _formatMinuteAsString(minute);
    } else if (typeof minute === "number") {
	return _formatMinuteAsNumber(minute);
    } else {
	return null;
    }

    return minute;
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

