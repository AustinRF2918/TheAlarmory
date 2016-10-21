var ModalWindow = function( ){
    return ( function( ) {
	// CoreComponent
	var $el = $("#modal-generator");
	var _internalDOMIdentifier = "modal-generator";

	// CoreComponentFields
	var _currentText = "Time's Up!";

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
		}


		_refreshTime();
		$("#" + _internalDOMIdentifier +  " #hour-alarm").html(hours);
		$("#" + _internalDOMIdentifier +  " #minute-alarm").html(_currentMinutes);
		$("#" + _internalDOMIdentifier +  " #when-alarm").html(" " + _currentPeriod);
	    }, 5000);
	};

	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function() {
	    var tag = '';
	    tag += '<div class="modal-overlay"';
	    tag +=   '<div class="modal-window">';
	    tag +=     '<div class="modal-body">';
	    tag +=     '<h5 class="modal-header">';
	    tag +=       _currentText;
	    tag +=     '</h5>';
	    tag +=       '<div class="btn-container">';
	    tag +=       '<a class="btn btn-modal">';
	    tag +=         'Wake Up';
	    tag +=       '</a>';
	    tag +=       '<a class="btn btn-modal">';
	    tag +=         'Snooze';
	    tag +=       '</a>';
	    tag +=       '</div>';
	    tag +=     '</div>';
	    tag +=   '</div>';
	    tag += '</div>';

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
	    // Pass
	};

	/*
	  _pushParent: Pushes a parent to the parent component.
	   Note that this is a top level component so we do not
	   implement this function totally.
	*/
	var _pushParent = function( component ) {
	    _parent = component;
	};
	
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
	    if ( data.componentName === 'ControlPanelComponent'  && data.periodActive !== undefined && data.hourActive !== undefined && data.minuteActive !== undefined) {
		_pushTime( data.hourActive, data.minuteActive, data.periodActive );
	    }
	};
	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
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
	    __generateTemplate: _generateTemplate,
	    __componentName: "TimeDeltaComponent",
	    __render: _render,
	    __handle: _handle,
	    __notify: _notify,
	    pushParent: _pushParent,
	    pushChild: _pushChild,
	    update: _update
	};
    })( );
};

