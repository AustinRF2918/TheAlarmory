// var TimeFormatter = require('../lib/time-formatting.js').TimeFormatter;
// var templateWrapper = require('../lib/template-helpers.js').templateWrapper;

var TimeDeltaComponent = function( DOMId ){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDelta constructor: must be a string");
    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId;
	var $el = $("#" + _internalDOMIdentifier);

	// CoreComponentFields
	var _currentTime = new Date();
	var _currentHours = _currentTime.getHours();
	var _currentPeriod = TimeFormatter.getPeriod(_currentHours);
	var _currentMinutes =  _currentTime.getMinutes();
	var _selectedHours = 0;
	var _selectedPeriod = TimeFormatter.formatPeriod( "AM" );
	var _selectedMinutes = 0;
	var _timeDelta = TimeFormatter.calculateDelta( _currentHours, _currentMinutes, _selectedHours, _selectedMinutes );

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
	    _refreshTime();

	    var interval = setInterval(_refreshTime, 5000);
	};

	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<h3 class="text-body text-extra">';
	    tag += '<strong>';
	    tag +=     '<span style="color: white" id="delta">' + _timeDelta + '</span>';
	    tag +=     '<span style="color: #e81f0c">' + ' HOURS' + '</span>';
	    tag += '</strong>';
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
	
	// In the case that internal components change,
	// will change time delta.
	var _refreshTimeDelta = function( ) {
	    _timeDelta = TimeFormatter.calculateDelta( _currentHours, _currentMinutes, _selectedHours, _selectedMinutes );

	    if ($("#" + _internalDOMIdentifier)) {
		$("#" + _internalDOMIdentifier +  " #delta").html(_timeDelta);
	    } else {
		console.log("Could not find selector: " + "#" + _internalDOMIdentifier);
	    }

	    if (_selectedHours.toString() == _currentHours.toString() &&
		_selectedMinutes.toString() == _currentMinutes.toString() &&
		_selectedPeriod.toString() == _currentPeriod.toString()) {


		_parent.__handle({
		    componentName: "TimeDeltaComponent",
		    firing: true
		});
	    }
	};

	// Refreshes the internal current time.
	// Maybe refreshTime should be refactored
	// with message?
	var _refreshTime = function( ) {
	    var _newTime = new Date( );
	    // Time delta doesn't need formatting here, it is never displayed.
	    _currentHours = _newTime.getHours();

	    _currentPeriod = TimeFormatter.getPeriod(_currentHours);

	    // Time delta doesn't need formatting here, it is never displayed.
	    _currentMinutes = _newTime.getMinutes();

	    _refreshTimeDelta( );
	};

	/*
	  _pushTime: Not so much a push as it is a refresh: take 
	  a hour, minute, and period and push it into the internal
	  data fields.
	*/
	var _pushTime = function( hour, minute, period ) {
	    try {
		_selectedHours = TimeFormatter.convertHourToMillitary( hour, period );
	    } catch(e) {
		_selectedHours = TimeFormatter.convertHourToMillitary( 0, period );
	    }
	    _selectedPeriod = period;
	    _selectedMinutes = minute;
	    _refreshTime( );
	};

	/*
	  _pushCurrentTime: Not so much a push as it is a refresh: take 
	  a hour, minute, and period and push it into the internal
	  data fields.
	*/
	var _pushCurrentTime = function( hour, minute, period ) {
	    try {
		_currentHours = TimeFormatter.convertHourToMillitary( hour, period );
	    } catch(e) {
		_currentHours = 0;
	    }
	    _currentPeriod = period;
	    _currentMinutes = minute;
	    _refreshTimeDelta( );
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
	    
	};

	/* 
	   _handle: _handle will take a JavaScript object and analyize it to do 
	   whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    if ( data && data.componentName === 'ControlPanelComponent'  && data.periodActive !== undefined && data.hourActive !== undefined && data.minuteActive !== undefined) {
		_pushTime( data.hourActive, data.minuteActive, data.periodActive );
	    } else if ( !data ) {
		console.log( "Error in getting dispatched data: " + data.toString() );
	    }
	};
	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
	/*
	var _display = function ( ) {
	    console.log( `_currentHours: (${_currentHours})` );
	    console.log( `_currentPeriod: (${_currentPeriod})` );
	    console.log( `_currentMinutes: (${_currentMinutes})` );

	    console.log( `_selectedHours: (${_selectedHours})` );
	    console.log( `_selectedPeriod: (${_selectedPeriod})` );
	    console.log( `_selectedMinutes: (${_selectedMinutes})` );

	    console.log( `_timeDelta: (${_timeDelta})` );
	};
	*/

	return {
	    //__display: _display,
	    __pushCurrentTime: _pushCurrentTime,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __componentName: "TimeDeltaComponent",
	    __render: _render,
	    __pushTime: _pushTime,
	    __handle: _handle,
	    __notify: _notify,
	    pushParent: _pushParent,
	    pushChild: _pushChild,
	    update: _update
	};
    })( );
};

// module.exports.TimeDeltaComponent = TimeDeltaComponent;
