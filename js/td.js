//timeConversionError(s: string, n: string, num: int): Returns
//an error message for certain cases of poorly constructed objects.
// Also shows the actual type that was attempted to be passed.
var timeConversionError = function(s, n) {
    self.message = s;
    self.attemptedType = n;
};

//toSecondsTypeCheck(dt:Date, s: string): Type checks the variables
//entered to toSeconds to ensure invalid data was not passed.
var toSecondsTypeCheck = function(dt, s) {
    if (dt.constructor.name != "Date") {
	throw new timeConversionError("Invalid input type on Date", s);
    }

    if (typeof s != "string") {
	throw new timeConversionError("Invalid input type on String", s);
    }
};

//toSeconds(dt: Date, s: string): Takes a date time object and
//a specific implemented type of time (Hours, minutes, etc) and
//converts it to seconds for analysis. Returns a numeric.
var toSecondsLeft = function(dt , s) {

    toSecondsTypeCheck(dt, s);

    switch (s.toLowerCase()) {
	case "hours":
	  convertHoursToSeconds(dt);
	  break;
	case "hour":
	  convertHoursToSeconds(dt);
	  break;
	case "minutes":
	  convertMinutesToSeconds(dt);
	  break;
	case "minute":
	  convertMinutesToSeconds(dt);
	  break;
        default:
	  throw new timeConversionError("Invalid type passed to string (must be hours or minutes", s);
	  break;
    }
};

//deltaAnalysisError(s: string): Returns an error message for
//certain cases of poorly constructed objects.
var deltaAnalysisError = function(s) {
    self.message = s;
};

//hoursLeft(dt: Date): Takes a date object and analyizes it
//for hours left of the day, will guarentee a numerical return
//type. throws on invalid input.
var hoursLeft = function(dt){
    if (dt.constructor.name != "Date") {
	throw new deltaAnalysisError("Invalid input type");
    } else {
	var secondsLeft = toSecondsLeft(dt, "hour");
    }
};

//Tests

var myDate = new Date();

console.log(hoursLeft(myDate));
