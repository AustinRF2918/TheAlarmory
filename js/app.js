function Button($selector, name, isActive, activeClass) {
    this.isActive = isActive;
    this.selector = $selector;
    this.name = name;
    this.activeClass = activeClass;
};

Button.prototype.toggleActiveClass = function(entity) {
    this.selector.toggleClass(this.activeClass);
};

Button.prototype.switchActiveClassOn = function() {
    if (!this.selector.hasClass(this.activeClass)) {
	this.toggleActiveClass();
    }
};

Button.prototype.switchActiveClassOff = function() {
    if (this.selector.hasClass(this.activeClass)) {
	this.toggleActiveClass();
    }
};


function ButtonCollection() {
    this.collection = [];
    this.pageCollection = [];
}

var clearActiveButtons = function(coll, btn){
    coll.forEach(function(element, index, array) {
	array[index].switchActiveClassOff();
    });
};

var clearActivePages = function(coll){
    coll.forEach(function(element, index, array) {
	setInactive(array[index]);
    });
};

var setActive = function($jElem) {
    if ($jElem.hasClass("inactive")){
	$jElem.addClass("active");
	$jElem.removeClass("inactive");
    };
};

var setInactive = function($jElem) {
    if ($jElem.hasClass("active")){
	$jElem.addClass("inactive");
	$jElem.removeClass("active");
    };
};

ButtonCollection.prototype.appendButton = function(btn, $pe) {
    if (btn.isActive === true) {
	btn.switchActiveClassOn();
    } 

    var myCollection = this.collection;
    var myPageCollection = this.pageCollection;

    btn.selector.click(function(){
	clearActiveButtons(myCollection, btn);
	clearActivePages(myPageCollection);

	setTimeout(function(){
	setActive($pe);
	btn.toggleActiveClass();
	}, 230);
    });

    this.collection.push(btn);
    this.pageCollection.push($pe);
};

var formatHour = function(hour) {
    if (hour === "0") {
	return "12";
    }

    if (hour.length != 2) {
	return "0" + hour;
    }


    return "" + hour;
};

var formatMinute = function(minute) {
    if (minute.length != 2) {
	return "0" + minute;
    }

    return minute;
};

var synchronizeClock = function(){
    $("#hour").html(formatHour($(".btn-square-hours-active").text()));
    $("#minute").html(formatMinute($(".btn-square-minutes-active").text()));
    $("#when").html($(".btn-square-types-active").text());

    var cDate = new Date();
    var cYear = cDate.getFullYear();
    var cHours = cDate.getHours();
    var cMinutes = cDate.getMinutes();
    var cWhen = cHours >= 12 ? 'PM' : 'AM';
    var sDate = new Date(cYear, cDate.getMonth(), cDate.getDay())
    cHours = cHours % 12;
    $("#currhour").html(cHours);
    $("#currminute").html(cMinutes);
    $("#currwhen").html(cWhen);

};

var generateJQuery = function(i, type, cName){
    var x = $("#"+type+"-"+i);
    console.log(x);
    x.click(function(){
	$('.' + cName).removeClass(cName);
	x.addClass(cName);
	synchronizeClock();
    });
};

$(document).ready(function(){
    var navigationButtons = new ButtonCollection();

    navigationButtons.appendButton(new Button($("#btn-at"), "atTimeButton", false, "btn-mode-red-active"), $('#at-content'));
    navigationButtons.appendButton(new Button($("#btn-in"), "inTimeButton", false, "btn-mode-purple-active"), $('#in-content'));
    navigationButtons.appendButton(new Button($("#btn-info"), "informationButton", true, "btn-mode-blue-active"), $('#help-content'));

    for (var i = 0; i < 60; i++) {
	generateJQuery(i, "minute", "btn-square-minutes-active");
    };

    for (var i = 0; i < 12; i++) {
	generateJQuery(i, "hour", "btn-square-hours-active");
    };

    generateJQuery(0, "type", "btn-square-types-active");
    generateJQuery(1, "type", "btn-square-types-active");
    synchronizeClock();

    setInterval(function() {
      synchronizeClock();
    }, 10000);

    

});


