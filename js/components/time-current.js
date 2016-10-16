// var TimeFormatter = require('../lib/time-formatting.js').TimeFormatter;
// var templateWrapper = require('../lib/template-helpers.js').templateWrapper;

var TimeCurrentComponent = function( DOMId ){
    if ( typeof DOMId !== "string" ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId;
	var $el = $("#" + _internalDOMIdentifier);

	// CoreComponentFields
	var _currentTime = new Date();
	

	var _currentHours = TimeFormatter.convertUnitToDigital( _currentTime.getHours());

	if (_currentHours === 0) {
	    _currentHours = 12;
	}

	var _currentPeriod = TimeFormatter.getPeriod(_currentHours);
	var _currentMinutes = TimeFormatter.formatMinute( _currentTime.getMinutes() );

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
	    var interval = setInterval(function() {

		var hours = TimeFormatter.convertMillitaryToHour(_currentHours);
		if (hours === 0) {
		    hours = 12;
		}
		_refreshTime();
		$("#" + _internalDOMIdentifier +  " #current-hour-alarm").html(hours);
		$("#" + _internalDOMIdentifier +  " #current-minute-alarm").html(_currentMinutes);
		$("#" + _internalDOMIdentifier +  " #current-when-alarm").html(_currentPeriod);
	    }, 5000);

	};

	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/

	var _generateTemplate = function() {
	    var tag = '';
	    var str = "";

	    tag += '<h5 class="text-body">';
	    tag +=   'Current Time: ';


	    if (_currentHours === "00") {
		str = "12";
	    } else {
		str = _currentHours;
	    }
	    tag +=   '<span id="current-hour-alarm">' + str + '</span>';
	    tag +=   ':';
	    tag +=   '<span id="current-minute-alarm">' + _currentMinutes + '</span>';
	    tag +=   '<span id="current-when-alarm"> ' + _currentPeriod + '</span>';
	    tag += '</h5>';

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
	
	// Refreshes internal current variables.
	var _refreshTime = function( ) {
	    var _newTime = new Date();
	    _currentHours = TimeFormatter.convertUnitToDigital( _newTime.getHours() );
	    _currentHours = TimeFormatter.convertMillitaryToHour(_currentHours);

	    if (_currentHours === "0") {
		_currentHours = 12;
	    }

	    _currentPeriod = TimeFormatter.getPeriod(_currentHours );
	    _currentMinutes = TimeFormatter.formatMinute( _newTime.getMinutes() );
	};

	// Refresh to __handle.
	// (Implement node trait)
	var _update = function( ) {
	    _refreshTime( );
	    _render( );
	};

	return {
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __render: _render,
	    __refresh: _refreshTime,
	    __componentName: "TimeCurrentComponent",
	    pushChild: _pushChild,
	    pushParent: _pushParent,
	    update: _update
	};
    })( );
};

// module.exports.TimeCurrentComponent = TimeCurrentComponent;
