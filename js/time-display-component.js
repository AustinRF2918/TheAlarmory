var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var templateWrapper = require('../js/template-helpers.js').templateWrapper;

var TimeDisplayComponent = function( DOMId ){
    if ( typeof DOMId !== "string" ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	var _selectedHours = TimeFormatter.formatHour( 0 );
	var _selectedPeriod = TimeFormatter.formatPeriod( "AM" );
	var _selectedMinutes = TimeFormatter.formatMinute( 0 );

	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h3 class="text-body text-extra">';
	    tag +=   '<strong>';
	    tag +=     'At ';
	    tag +=     '<span id="hour-alarm">' + _selectedHours + '</span>';
	    tag +=     '<span id="exxtra">' + ':' + '</span>';
	    tag +=     '<span id="minute-alarm">' + _selectedMinutes + '</span>';
	    tag +=     '<span id="when-alarm">' + _selectedPeriod + '</span>';
	    tag +=   '</strong>';
	    tag += '</h3>';

	    return( templateWrapper( _internalDOMIdentifier, tag ));
	};
	
	var _render = function() {
	    $el.remove();
	    $el.html( _generateTemplate() );
	};

	var _pushTime = function( hour, minute, period ) {
	    _selectedHours = TimeFormatter.formatHour(hour);
	    _selectedMinutes = TimeFormatter.formatMinute(minute);
	    _selectedPeriod = TimeFormatter.formatPeriod(period);
	};

	var _update = function( hour, minute, period ) {
	    _pushTime( hour, minute, period );
	    _render( );
	};
	return {
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __render: _render,
	    __pushTime: _pushTime,
	    update: _update
	};
    })( );
};

module.exports.TimeDisplayComponent = TimeDisplayComponent;
