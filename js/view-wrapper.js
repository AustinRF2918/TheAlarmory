/**
 * Roughly cooresponds to a minimalistic view in Angular or Backbone.
 * Basically, this is a module pattern with private types that must be
 * called in the direction ssen in app.js. It keeps track of the dom and
 * changes to time data and other data.
 * @function
 */
var ClockInterface = function() {
    return (function() {
	//The DOM unit that will contain text cooresponding to the
	//amount of hours, minutes, or periods that are to be
	//waited on.
	var selectedHoursID = null;
	var selectedMinutesID = null;
	var selectedPeriodID = null;

	//The internal units that coorespoond to our actual selected
	//data.
	var selectedHours = null;
	var selectedMinutes = null;
	var selectedPeriod = null;

	//The DOM unit that represents the display of the selected
	//hours: AKA "at". This must be slightly modular to allow
	//Alarm Clock modes and well as Stopwatch modes.
	var selectedHoursIndicator = null;
	var selectedMinutesIndicator = null;
	var selectedPeriodIndicator = null;

	//The Date/Time object that correspond to the current date/
	//time.
	var currentHour = null; 
	var currentMinute = null;
	var currentPeriod = null;

	//The DOM unit cooresponding to the current clock time on
	//ones computer.
	var currentHoursIndicator = null;
	var currentMinutesIndicator = null;
	var currentPeriodIndicator = null;

	//The DOM unit cooresponding the the logically calculated time
	//that one will wait until the alarm rings.
	var deltaHoursIndicator = null;

	/**
	* Name stands for assign hour minute periods: Assigns the selected DOM 
	* elements that are passed in as parameters to be internal objects of this
	* mediator class. Also assigns selectedHours, selectedMinutes and selectedPeriod
	* values that are inside of those from the getgo.
	* @function
	* @param {JQuery Object} selectedHoursSelector - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired hour is.
	* @param {JQuery Object} selectedMinutesSelectors - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired minute is.
	* @param {JQuery Object} selectedPeriodSelector - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired period is.
	*/

	var _debugDisplay = function() {
	};

	var _assignHMPs = function(selectedHoursSelector, selectedMinutesSelector, selectedPeriodSelector) {
	    selectedHoursID = $(selectedHoursSelector);
	    selectedMinutesID = $(selectedMinutesSelector);
	    selectedPeriodID = $(selectedPeriodSelector);

	    selectedHours = selectedHoursID.text();
	    selectedMinutes = selectedMinutesID.text();
	    selectedPeriod = selectedPeriodID.text();
	};


	/**
	* Name stands for assign autonomous indicators: Assigns the selected DOM 
	* elements that are passed in as parameters to be internal objects of this
	* mediator class. Also assigns selectedHoursIndicator, selectedMinutesIndicator 
	* and selectedPeriodIndicator DOM elements using the JQuery html function.
	* @function
	* @param {JQuery hourDisplay} selectedHoursSelector - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired hour .
	* @param {JQuery Object} selectedMinutesSelectors - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired minute is.
	* @param {JQuery Object} selectedPeriodSelector - The JQuery selector for whatever
	* an active selected element that contains text cooresponding to the desired period is.
	*/
	var _assignAIs = function(hourDisplay, minuteDisplay, periodDisplay, isAmerican) {
	    if (!selectedHoursIndicator){
		selectedHoursIndicator = $(hourDisplay);
	    }

	    if (!selectedMinutesIndicator) {
		selectedMinutesIndicator = $(minuteDisplay);
	    }

	    if (!selectedPeriodIndicator) {
		selectedPeriodIndicator = $(periodDisplay);
	    }

	    if (isAmerican){
		selectedHoursIndicator.html(TimeFormatter.formatHour(selectedHours, "American"));
		selectedMinutesIndicator.html(TimeFormatter.formatMinute(selectedMinutes, "American"));
		selectedPeriodIndicator.html(selectedPeriod);
	    } else {
		selectedHoursIndicator.html(TimeFormatter.formatHour(selectedHours, "other"));
		selectedMinutesIndicator.html(TimeFormatter.formatMinute(selectedMinutes, "other"));
		selectedPeriodIndicator.html(selectedPeriod);
	    }
	};

	//TODO: GIVE RUNDOWN ON THIS FOR DOCS.
	var _hookCurrentSelectors = function(currentHourSelector, currentMinuteSelector, currentPeriodSelector) {
	    currentHoursIndicator = currentHourSelector;
	    currentMinutesIndicator = currentMinuteSelector;
	    currentPeriodIndicator = currentPeriodSelector;
	};

	//TODO: GIVE RUNDOWN ON THIS FOR DOCS.
	var _assignDelta = function(deltaSelector) {
	    if (!deltaHoursIndicator){
		deltaHoursIndicator = $(deltaSelector);
	    }

	    var tempMHours = TimeFormatter.convertNumericToMillitary(selectedHours, selectedPeriod);
	    var tempDelta = TimeFormatter.calculateDelta(tempMHours, currentHour, currentMinute, selectedMinutes);
	    console.log(tempDelta);
	    $(deltaHoursIndicator).html(tempDelta);
	};

	//TODO: GIVE RUNDOWN ON THIS FOR DOCS.
	var _refresh = function() {
	    var currentDate = new Date();
	    currentHour = currentDate.getHours();
	    currentMinute = currentDate.getMinutes();
	    currentPeriod = currentHour >= 12 ? 'PM' : 'AM';
	};

	//TODO: GIVE RUNDOWN ON THIS FOR DOCS.
	var _isFiring = function() {
	    if (currentHour.toString() === selectedHours.toString()
		&& currentMinute.toString() === selectedMinutes.toString()
		&& currentPeriod.toString() === selectedPeriod.toString()) {
		return true;
	    } else {
		return false;
	    }
	};

	//TODO: GIVE RUNDOWN ON THIS FOR DOCS.
	var _displayCurrent = function() {
	    var tempMinutes = TimeFormatter.convertUnitToDigital(currentMinute);
	    
	    currentHoursIndicator.html(TimeFormatter.convertMillitaryToNumeric(currentHour));
	    currentMinutesIndicator.html(tempMinutes);
	    currentPeriodIndicator.html(currentPeriod);
	};


	return {
	    debug: _debugDisplay,
	    assignHMPs: _assignHMPs,
	    assignAIs : _assignAIs,
	    assignDelta: _assignDelta,
	    hookCurrentSelectors: _hookCurrentSelectors,
	    refresh: _refresh,
	    displayCurrent: _displayCurrent,
	    isFiring: _isFiring
	    
	};
    }
)()};
