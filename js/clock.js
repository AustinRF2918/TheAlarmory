/**
 * Automatically generates a clock DOM hooker that connects to portions of 
 * the document and we can periodically tic and change.
 * @function
 * @param {JQuery Object} $hourActiveButton - The element with this class 
 * determines the selected hour of the alarm.
 * @param {JQuery Object} $minuteActiveButton - The element with this class 
 * determines the selected minute of the alarm. 
 * @param {JQuery Object} $periodActiveButton - The element with this class 
 * determines the selected period of the alarm. 
 * @param {JQuery Object} $hourAlarmDisplay - The element with this class 
 * determines place to display the hour the alarm is set.
 * @param {JQuery Object} $minuteAlarmDisplay - The element with this class 
 * determines place to display the minute the alarm is set.
 * @param {JQuery Object} $periodAlarmDisplay - The element with this class 
 * determines place to display the period the alarm is set.
 * @param {JQuery Object} $deltaAlarmDisplay - The element with this class 
 * determines place to display the delta determined by internal function.
 * @param {JQuery Object} $hourCurrentDisplay - The element with this class 
 * determines place to display the current hour.
 * @param {JQuery Object} $minuteCurrentDisplay - The element with this class 
 * determines place to display the current minute.
 * @param {JQuery Object} $periodCurrentDisplay - The element with this class 
 * determines place to display the current period.
 * @param {bool} americanTimeStyling - Determine if we are to display the time
 * American style (aka 12 instead of 0) or European style (0 instead of 12).
 * @param {function} callback - Functions to call if the alarm is ringing
 */

var generateSynchronizableClock = function(
    $hoursActiveButton, //The element with this class determines the selected hour of the alarm.
    $minutesActiveButton, //The element with this class determines the selected minute of the alarm.
    $periodActiveButton, //The element with this class determines the selected period of the alarm.
    $hourAlarmDisplay, //The element that will display the current selected hour.
    $minuteAlarmDisplay, //The element that will display the current selected minute.
    $periodAlarmDisplay, //The element that will display the current selected period.
    $deltaAlarmDisplay, //The element that will display the current selected delta value.
    $hourCurrentDisplay, //The element that will display the current hour.
    $minuteCurrentDisplay, //The element that will display the current minute.
    $periodCurrentDisplay, //The element that will display the current period.
    americanTimeStyling, //If time is to be displayed with 0 as 12 or 0 as 0.
    callback) //The element that will display the current period.
{ return (function(){
    var temp = ClockInterface();

    temp.assignHMPs(
	$hoursActiveButton,
	$minutesActiveButton,
	$periodActiveButton
    );

    temp.assignAIs(
	$hourAlarmDisplay,
	$minuteAlarmDisplay,
	$periodAlarmDisplay,
	americanTimeStyling
    );

    temp.refresh();

    temp.assignDelta($deltaAlarmDisplay);

    if (temp.isFiring()) {
	callback();
    }

    temp.hookCurrentSelectors(
	$hourCurrentDisplay,
	$minuteCurrentDisplay,
	$periodCurrentDisplay
    );

    temp.refresh();
    temp.displayCurrent();
    temp.debug();

})};
 
