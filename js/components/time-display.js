// var TimeFormatter = require('../lib/time-formatting.js').TimeFormatter;
// var templateWrapper = require('../lib/template-helpers.js').templateWrapper;

var TimeDisplayComponent = function( DOMId ){
    if ( typeof DOMId !== "string" ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId;
	var $el = $("#" + _internalDOMIdentifier);

	// CoreComponentFields
	var _selectedHours = TimeFormatter.formatHour( 1 );
	var _selectedPeriod = TimeFormatter.formatPeriod( "AM" );
	var _selectedMinutes = TimeFormatter.formatMinute( 0 );

	// Handles Events
	var _actions = [];

	// Node
	var _children = [];
	var _parent = undefined;

	/*
	  View components: _render should only be called on initial render and following this
	  a rerender should be called: JQuery will do this by changing text elements or any 
	  class attributes.
	*/

	/*
	  _render: Internal function to remove the element that is current hooked to 
	  our component and following this rerender the HTML: Unless there is some 
	  reason to do so, we should in general keep this used only once, otherwise
	  we should hook JQuery functions to our _handle function, implemented by
	  the ComponentMessanger trait.
	*/
	var _render = function() {
	    $el.append( _generateTemplate( ) );
	};

	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h3 class="text-body text-extra">';
	    tag +=   '<strong>';
	    tag +=     'At ';
	    tag +=     '<span id="hour-alarm">' + _selectedHours + '</span>';
	    tag +=     '<span id="exxtra">' + ':' + '</span>';
	    tag +=     '<span id="minute-alarm">' + _selectedMinutes + '</span>';
	    tag +=     '<span id="when-alarm"> ' + _selectedPeriod + '</span>';
	    tag +=   '</strong>';
	    tag += '</h3>';

	    return( templateWrapper( _internalDOMIdentifier, tag ));
	};

	/*
	 OrderedComponents trait: OrderedComponents will require our object to both
	  implement a _pushParent function which our component can notify, and a 
	  _pushChild function, which our component can receive notification from.
	*/

	/*
	  _pushChild: Pushes a child to the internal stack of children components.
	*/
	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};

	/*
	  _pushParent: Pushes a parent to the parent component.
	   Note that this is a top level component so we do not
	   implement this function totally.
	*/
	var _pushParent = function( component ) {
	    _parent = component;
	};


	/*
	  _pushTime: Not so much a push as it is a refresh: take 
	  a hour, minute, and period and push it into the internal
	  data fields.
	*/
	var _pushTime = function( hour, minute, period ) {
	    _selectedHours = TimeFormatter.formatHour(hour) + 1;
	    _selectedMinutes = TimeFormatter.formatMinute(minute);
	    _selectedPeriod = TimeFormatter.formatPeriod(period);
	};

	/*
	  _update: Composition of _pushTime and _render. You do the math.
	*/
	var _update = function( hour, minute, period ) {
	    _pushTime( hour, minute, period );
	    _render( );
	};

	/* 
	   Node trait: Node means we have to implement _notify and _handle:
	   both of these allow our component to send and recieve events 
	   and messages from other components respectively.
	*/

	/* 
	   _notify: notify sends our parent a handle function with a JavaScript
	   object: our parent is then free to implement handle in whatever way
	   it sees fit to handle messaging between components. 
	*/
	var _notify = function( ) {
	    // TimeDeltaComponent is not interactive: Thus no notification will ever be needed.
	};

	/* 
	   _handle: _handle will take a JavaScript object and analyize it to do 
	   whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    if ( data && data.componentName === 'ControlPanelComponent' ) {
		_selectedHours = data.hourActive;
		_selectedPeriod = data.periodActive;
		_selectedMinutes = data.minuteActive;

		var hourDisplay = TimeFormatter.convertUnitToDigital(_selectedHours);
		var minuteDisplay = TimeFormatter.convertUnitToDigital(_selectedMinutes);

		$("#" + _internalDOMIdentifier +  " #hour-alarm").html(hourDisplay);
		$("#" + _internalDOMIdentifier +  " #minute-alarm").html(minuteDisplay);
		$("#" + _internalDOMIdentifier +  " #when-alarm").html(" " + _selectedPeriod);
	    } else if ( !data ) {
		console.log( "Error in getting dispatched data: " + data.toString() );
	    }
	};

	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
	/*
	var _display = function ( ) {
	    console.log( `_selectedHours: (${_selectedHours})` );
	    console.log( `_selectedMinutes: (${_selectedMinutes})` );
	    console.log( `_selectedPeriod: (${_selectedPeriod})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `html: (${_generateTemplate()})` );
	};
	*/

	return {
	    //__display: _display,
	    __selectedMinutes: _selectedMinutes,
	    __selectedHours: _selectedHours,
	    __selectedPeriod: _selectedPeriod,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __componentName: "TimeDisplayComponent",
	    __render: _render,
	    __pushTime: _pushTime,
	    __notify: _notify,
	    __handle: _handle,
	    update: _update,
	    pushParent: _pushParent,
	    pushChild: _pushChild
	};
    })( );
};

// module.exports.TimeDisplayComponent = TimeDisplayComponent;
