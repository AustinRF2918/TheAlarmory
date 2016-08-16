alarmAudio = new Audio("../sounds/alarm.ogg");

$(document).ready(function(){

    var navigationButtons = new ButtonCollection();
    navigationButtons.appendButton(new Button($("#btn-at"), "atTimeButton", true, "btn-mode-red-active"), $('#at-content'));
    navigationButtons.appendButton(new Button($("#btn-in"), "inTimeButton", false, "btn-mode-purple-active"), $('#in-content'));

    var hookAlarmClockTimer = function(){return generateSynchronizableClock(
	$(".btn-square-hours-active"),
	$(".btn-square-minutes-active"),
	$(".btn-square-types-active"),
	$("#hour-alarm"),
	$("#minute-alarm"),
	$("#when-alarm"),
	$("#delta"),
	$("#current-hour-alarm"),
	$("#current-minute-alarm"),
	$("#current-when-alarm"),
	true,
	function(){}
    )();};

    var generateJQuery = function(i, type, cName){
	var x = $("#"+type+"-"+i);
	x.click(function(){
	    $('.' + cName).removeClass(cName);
	    x.addClass(cName);
	    hookAlarmClockTimer();
	});
    };

    for (var i = 0; i < 60; i++) {
	generateJQuery(i, "minute", "btn-square-minutes-active");
    };

    for (var i = 0; i < 12; i++) {
	generateJQuery(i, "hour", "btn-square-hours-active");
    };

    generateJQuery(0, "type", "btn-square-types-active");
    generateJQuery(1, "type", "btn-square-types-active");

    hookAlarmClockTimer();
    setInterval(function() {
	hookAlarmClockTimer();
    }, 5000);

    

});


