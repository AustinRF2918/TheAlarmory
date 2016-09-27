var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;

var _checkTDInstantiate = function( value ) {
    return (typeof value === "string");
};

var TimeDisplayComponent = function( DOMId ){
    if ( !_checkTDInstantiate( DOMId ) ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	var _currentHours = TimeFormatter.formatHour( 0 );
	var _currentMinutes = TimeFormatter.formatMinute( 0 );
	var _currentPeriod = "AM";

	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h3 class="text-body text-extra">';
	    tag +=   '<strong>';
	    tag +=     'At ';
	    tag +=     '<span id="hour-alarm">' + _currentHours + '</span>';
	    tag +=     '<span id="exxtra">' + ':' + '</span>';
	    tag +=     '<span id="minute-alarm">' + _currentMinutes + '</span>';
	    tag +=     '<span id="when-alarm">' + _currentPeriod + '</span>';
	    tag +=   '</strong>';
	    tag += '</h3>';
	    return tag;
	};
	
	var _render = function() {
	    $el.html( _generateTemplate() );
	};

	var _pushTime = function( hour, minute, period ) {
	    _currentHours = TimeFormatter.formatHour(hour);
	    _currentMinutes = TimeFormatter.formatMinute(minute);
	    _currentPeriod = TimeFormatter.formatPeriod(period);
	};

	return {
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    render: _render,
	    pushTime: _pushTime
	};
    })( );
};

module.exports.TimeDisplayComponent = TimeDisplayComponent;
