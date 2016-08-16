var ClockInterface = function() {
    return (function() {

	console.log("Initializing ClockInterface");

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


	var _assignHMPs = function(selectedHoursSelector, selectedMinutesSelector, selectedPeriodSelector) {
	    if (!selectedHoursID) {
		selectedHoursID = $(selectedHoursSelector);
	    }

	    if (!selectedMinutesID) {
		selectedMinutesID = $(selectedMinutesSelector);
	    }

	    if (!selectedPeriodID) {
		selectedPeriodID = $(selectedPeriodSelector);
	    }

	    selectedHours = selectedHoursID.text();
	    selectedMinutes = selectedMinutesID.text();
	    selectedPeriod = selectedPeriodID.text();
	};


	var _assignAIs = function(hourDisplay, minuteDisplay, periodDisplay) {
	    if (!selectedHoursIndicator){
		selectedHoursIndicator = $(hourDisplay);
	    }

	    if (!selectedMinutesIndicator) {
		selectedMinutesIndicator = $(minuteDisplay);
	    }

	    if (!selectedPeriodIndicator) {
		selectedPeriodIndicator = $(periodDisplay);
	    }

	    selectedHoursIndicator.html(TimeFormatter.formatHour(selectedHours, "American"));
	    selectedMinutesIndicator.html(TimeFormatter.formatMinute(selectedMinutes, "American"));
	    selectedPeriodIndicator.html(selectedPeriod);
	};

	var _hookCurrentSelectors = function(currentHourSelector, currentMinuteSelector, currentPeriodSelector) {
	    currentHoursIndicator = currentHourSelector;
	    currentMinutesIndicator = currentMinuteSelector;
	    currentPeriodIndicator = currentPeriodSelector;
	};

	

	var _assignDelta = function(deltaSelector) {
	    if (!deltaHoursIndicator){
		deltaHoursIndicator = $(deltaSelector);
	    }

	    var tempMHours = TimeFormatter.convertNumericToMillitary(selectedHours, selectedPeriod);
	    var tempDelta = TimeFormatter.calculateDelta(tempMHours, currentHour);
	    $(deltaHoursIndicator).html(tempDelta);
	    console.log(selectedPeriod);
	};

	var _refresh = function() {
	    var currentDate = new Date();
	    currentHour = currentDate.getHours();
	    currentMinutes = currentDate.getMinutes();
	    currentPeriod= currentHour >= 12 ? 'PM' : 'AM';
	};

	var _isFiring = function() {
	    if (currentHour == selectedHours
		&& currentMinute == selectedMinutes
		&& currentPeriod == selectedPeriod) {
		return true;
	    } else {
		return false;
	    }
	};

	var _displayCurrent = function() {
	    var tempMinutes = TimeFormatter.convertUnitToDigital(currentMinutes);
	    
	    currentHoursIndicator.html(TimeFormatter.convertMillitaryToNumeric(currentHour));
	    currentMinutesIndicator.html(tempMinutes);
	    currentPeriodIndicator.html(currentPeriod);
	};


	return {
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
