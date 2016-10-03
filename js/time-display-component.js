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

	var _actions = [];

	var _children = [];
	var _parent = undefined;

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

	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};

	var _pushParent = function( component ) {
	    _parent = component;
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

	var _notify = function( ) {
	    // TimeDeltaComponent is not interactive: Thus no notification will ever be needed.
	};

	var _handle = function( data ) {
	    if ( data.componentName === 'ControlPanelComponent' ) {
            _selectedHours = data.hourActive;
            _selectedPeriod = data.periodActive;
            _selectedMinutes = data.minuteActive;
	    }
	};

	var _display = function ( ) {
	    console.log( `_selectedHours: (${_selectedHours})` );
	    console.log( `_selectedMinutes: (${_selectedMinutes})` );
	    console.log( `_selectedPeriod: (${_selectedPeriod})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	return {
	    __selectedMinutes: _selectedMinutes,
	    __selectedHours: _selectedHours,
	    __selectedPeriod: _selectedPeriod,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __componentName: "TimeDisplayComponent",
	    __render: _render,
	    __pushTime: _pushTime,
	    __display: _display,
	    __notify: _notify,
	    __handle: _handle,
	    update: _update,
	    pushParent: _pushParent,
	    pushChild: _pushChild
	};
    })( );
};

module.exports.TimeDisplayComponent = TimeDisplayComponent;
