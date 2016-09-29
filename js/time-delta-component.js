var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var templateWrapper = require('../js/template-helpers.js').templateWrapper;

var TimeDeltaComponent = function( DOMId ){
    if ( typeof DOMId !== "string" ) {
	throw new ValueError("Invalid data type passed to TimeDeltaComponent constructor: must be a string.");
    }

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	var _currentTime = new Date();

	var _currentHours = _currentTime.getHours();
	var _currentPeriod = TimeFormatter.getPeriod(_currentHours);
	var _currentMinutes =  _currentTime.getMinutes();

	var _selectedHours = 0;
	var _selectedPeriod = TimeFormatter.formatPeriod( "AM" );
	var _selectedMinutes = 0;

	var _timeDelta = TimeFormatter.calculateDelta( _currentHours, _currentMinutes, _selectedHours, _selectedMinutes );

	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h5 class="text-body text-extra">';
	    tag +=   '<strong>';
	    tag +=     'In: ';
	    tag +=     '<span id="delta">' + _timeDelta + '</span>';
	    tag +=   '</strong>';
	    tag += '</h5>';

	    return( templateWrapper( _internalDOMIdentifier, tag ));
	};
	
	var _render = function() {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	var _refreshTimeDelta = function( ) {
	    _timeDelta = TimeFormatter.calculateDelta( _currentHours, _currentMinutes, _selectedHours, _selectedMinutes );
	};

	var _refreshTime = function( ) {
	    var _newTime = new Date( );
	    _currentHours = _newTime.getHours();
	    _currentPeriod = TimeFormatter.getPeriod(_currentHours );
	    _currentMinutes = _newTime.getMinutes();
	    _refreshTimeDelta( );
	};

	var _pushTime = function( hour, minute, period ) {
	    _selectedHours = TimeFormatter.convertHourToMillitary( hour - 1, period );
	    _selectedPeriod = period;
	    _selectedMinutes = minute;
	    _refreshTime( );
	};

	var _pushCurrentTime = function( hour, minute, period ) {
	    _currentHours = TimeFormatter.convertHourToMillitary( hour - 1, period );
	    _currentPeriod = period;
	    _currentMinutes = minute;
	    _refreshTimeDelta( );
	};

	var _update = function( hour, minute, period ) {
	    _pushTime( hour, minute, period );
	    _render( );
	};

	var _display = function ( ) {
	    console.log( `_currentHours: (${_currentHours})` );
	    console.log( `_currentPeriod: (${_currentPeriod})` );
	    console.log( `_currentMinutes: (${_currentMinutes})` );

	    console.log( `_selectedHours: (${_selectedHours})` );
	    console.log( `_selectedPeriod: (${_selectedPeriod})` );
	    console.log( `_selectedMinutes: (${_selectedMinutes})` );

	    console.log( `_timeDelta: (${_timeDelta})` );
	};

	return {
	    __display: _display,
	    __pushCurrentTime: _pushCurrentTime,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __render: _render,
	    __pushTime: _pushTime,
	    update: _update
	};
    })( );
};

module.exports.TimeDeltaComponent = TimeDeltaComponent;
