var ClockInterface = function()
{
    return (function() {
	//The DOM unit that will contain text cooresponding to the
	//amount of hours, minutes, or periods that are to be
	//waited on.
	var selectedHoursID = null;
	var selectedMinutesID = null;
	var selectedPeriod = null;

	//The DOM unit that represents the display of the selected
	//hours: AKA "at". This must be slightly modular to allow
	//Alarm Clock modes and well as Stopwatch modes.
	var selectedHoursIndicator = null;
	var selectedMinutesIndicator = null;
	var selectedPeriodIndicator = null;

	//The DOM unit cooresponding to the current clock time on
	//ones computer.
	var currentHoursIndicator = null;
	var currentMinutesIndicator = null;
	var currentPeriodIndicator = null;

	//The DOM unit cooresponding the the logically calculated time
	//that one will wait until the alarm rings.
	var deltaHoursIndicator = null;

	//The Date/Time object that correspond to the current date/
	//time.
	var currentDate = null;
	var currentHour = null; 
	var currentMinute = null;
	var currentPeriod = null;

}
)};
