var alarmAudio = new Audio("../sounds/alarm.ogg");
alarmAudio.loop = true;

var alarmSnoozeMode = false;

function generateMiniButton( numeric, type, cName, cb ) {
    var temp = $('#' + type + "-" + numeric);
    temp.click( function() {
	$( '.' + cName ).removeClass( cName );
	temp.addClass( cName );
	cb();
    });
};

var alarmContainer = new Modal('rgba(0, 0, 0, 0.7)', 'white', "general-modal");
var alarmContent = new Modal('rgba(255, 255, 255, 1)', 'black', "submodal");
alarmContent.el.addClass('p-y-2 text-xs-center');
alarmContent.el.append(
    $('<h1>').append('Time to wake up!'),
    $('<div class="col-md-12 m-t-1">').append(
	$('<a class="btn-wake-up btn btn-mode btn-mode-purple m-x-1">').append('Wake').click(function(){
	    alarmAudio.pause();
	    alarmSnoozeMode = false;
	    alarmContainer.el.remove();
	}),
	$('<a class="btn-snooze btn btn-mode btn-mode-purple m-x-1">').append('Snooze').click(function(){
	    alarmAudio.pause();
	    alarmSnoozeMode = true;
	    alarmContainer.el.remove();

	    setTimeout(function(){
		alarmAudio.play();
	    } , 3000);

	    setTimeout(function(){
		$('.btn-snooze').click(function() {
		    alarmAudio.pause();
		    alarmSnoozeMode = true;
		    alarmContainer.el.remove();
		});

		$('.btn-wake').click(function() {
		    alarmAudio.pause();
		    alarmSnoozeMode = false;
		    alarmContainer.el.remove();
		});

		alarmContainer.show();
	    } , 3000);
	})
    )
);

alarmContainer.append(alarmContent, 50, 50, 33, 20);


$(document).ready(function(){
    //Page navigation.
    var navigationButtons = new ButtonCollection();
    navigationButtons.appendButton(new Button($("#btn-at"), "atTimeButton", true, "btn-mode-red-active"), $('#at-content'));
    navigationButtons.appendButton(new Button($("#btn-in"), "inTimeButton", false, "btn-mode-purple-active"), $('#in-content'));

    //Alarm Clock Timer
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
	function(){
		alarmContainer.show();
		alarmAudio.play();
		
	    }
    )();};

    for (var i = 0; i < 60; i++) {
	generateMiniButton(i, "minute", "btn-square-minutes-active", hookAlarmClockTimer);
    };

    for (var i = 0; i < 12; i++) {
	generateMiniButton(i, "hour", "btn-square-hours-active", hookAlarmClockTimer);
    };

    generateMiniButton(0, "type", "btn-square-types-active", hookAlarmClockTimer);
    generateMiniButton(1, "type", "btn-square-types-active", hookAlarmClockTimer);


    hookAlarmClockTimer();

        setInterval(function() {
	hookAlarmClockTimer();
    }, 5000);
});


