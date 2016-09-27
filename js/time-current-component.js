var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;

var TimeCurrentComponent = function( DOMId ){
    if ( typeof DOMId !== "string" ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	var _currentTime = new Date();

	var _currentHours = TimeFormatter.convertUnitToDigital( _currentTime.getHours() );
	var _currentPeriod = TimeFormatter.getPeriod(_currentHours);
	var _currentMinutes = TimeFormatter.formatMinute( _currentTime.getMinutes() );

	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h5 class="text-body">';
	    tag +=   'Current Time: ';
	    tag +=   '<span id="current-hour-alarm">' + _currentHours + '</span>';
	    tag +=   ':';
	    tag +=   '<span id="current-minute-alarm">' + _currentMinutes + '</span>';
	    tag +=   '<span id="current-when-alarm">' + _currentPeriod + '</span>';
	    tag += '</h5>';
	    return tag;
	};
	
	var _render = function() {
	    $el.remove();
	    $el.html( _generateTemplate() );
	};

	var _refreshTime = function( ) {
	    var _newTime = new Date();
	    _currentHours = TimeFormatter.convertUnitToDigital( _newTime.getHours() );
	    _currentPeriod = TimeFormatter.getPeriod(_currentHours );
	    _currentMinutes = TimeFormatter.formatMinute( _newTime.getMinutes() );
	};

	var _update = function( ) {
	    _refreshTime( );
	    _render( );
	};

	return {
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __render: _render,
	    __refresh: _refreshTime,
	    update: _update
	};
    })( );
};

module.exports.TimeCurrentComponent = TimeCurrentComponent;
