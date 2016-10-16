var alarmAudio = new Audio("../sounds/alarm.ogg");
alarmAudio.loop = true;

var alarmSnoozeMode = false;

$(document).ready(function(){
    var controller = ApplicationController();
    
    var tdsA = SelectorPortionComponent( "#hour-container", "Hours" );
    for (var itemNumber = 1; itemNumber < 13; itemNumber++) {
	tdsA.pushChild( SelectorButtonComponent( "#hour", itemNumber, "btn-square-hours" ) );
    }

    var tdsC = SelectorPortionComponent( "#minute-container", "Minutes" );
    var test = [];
    for (var itemNumber = 0; itemNumber < 60; itemNumber++) {
	var temp = SelectorButtonComponent( "minute", itemNumber, "btn-square-minutes" )
	tdsC.pushChild( temp );
    }

    var tds = ControlPanelComponent( "#control-panel" );
    tds.pushChild( tdsC );
    tdsC.__render();

    for (var i of tdsC.children) {
	console.log(i);
	i.setEvent("click");
    }

    var tdsE = SelectorPortionComponent( "#when-container", "AM/PM" );
    tdsE.pushChild( SelectorButtonComponent( "type", "AM", "btn-square-when", true ) );
    tdsE.pushChild( SelectorButtonComponent( "type", "PM", "btn-square-when", true ) );


    tds.pushChild( tdsA );
    tds.pushChild( tdsE );
    tdsA.__render();
    tdsE.__render();

    var timeDisplay = TimeDisplayComponent( "#time-display-component" );
    var timeDelta = TimeDeltaComponent( "#time-delta-component" );
    var timeCurrent = TimeCurrentComponent( "#time-current-component" );

    controller.pushChild(tds);
    controller.pushChild(timeDisplay);
    controller.pushChild(timeDelta);
    controller.pushChild(timeCurrent);
});


