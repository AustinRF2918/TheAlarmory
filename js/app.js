var alarmAudio = new Audio("../sounds/alarm.ogg");
alarmAudio.loop = true;

var alarmSnoozeMode = false;

$(document).ready(function(){
    var controller = ApplicationController();
    var tds = ControlPanelComponent( "#control-panel" );
    
    // Hours Container
    var tdsA = SelectorPortionComponent( "#hour-container", "Hours" );
    for (var itemNumber = 1; itemNumber < 13; itemNumber++) {
	var temp = SelectorButtonComponent( "hour", itemNumber, "btn-square-hours" ) 
	tdsA.pushChild( temp );
	if ( itemNumber == 1 ) {
	    temp.__fireEvent();
	}
    }
    tds.pushChild( tdsA );
    tdsA.__render();
    for (var i of tdsA.children) {
	i.setEvent("click");
    }
    // End Hours Container

    // Minute Container
    var tdsC = SelectorPortionComponent( "#minute-container", "Minutes" );
    for (var itemNumber = 0; itemNumber < 60; itemNumber++) {
	var temp =  SelectorButtonComponent( "minute", itemNumber, "btn-square-minutes" );
	tdsC.pushChild( temp );
	if ( itemNumber == 0 ) {
	    temp.__fireEvent();
	}
    }
    tds.pushChild( tdsC );
    tdsC.__render();
    for (var i of tdsC.children) {
	i.setEvent("click");
    }
    // End Minute Container

    // When Contains
    var tdsE = SelectorPortionComponent( "#when-container", "AM/PM" );
    var temp = SelectorButtonComponent( "type", "AM", "btn-square-when", true ) 
    tdsE.pushChild(temp);
    temp.__fireEvent();
    tdsE.pushChild( SelectorButtonComponent( "type", "PM", "btn-square-when", true ) );
    tds.pushChild( tdsE );
    tdsE.__render();
    for (var i of tdsE.children) {
	i.setEvent("click");
    }
    // End When Container

    var timeDisplay = TimeDisplayComponent( "#time-display-component" );
    timeDisplay.__render();

    var timeDelta = TimeDeltaComponent( "#time-delta-component" );
    timeDelta.__render();

    var timeCurrent = TimeCurrentComponent( "#time-current-component" );
    timeCurrent.__render();


    controller.pushChild(tds);
    controller.pushChild(timeDisplay);
    controller.pushChild(timeDelta);
    controller.pushChild(timeCurrent);
});


