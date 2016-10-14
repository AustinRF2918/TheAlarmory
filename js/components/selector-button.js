var TimeFormatter = require('../lib/time-formatting.js').TimeFormatter;
var templateWrapper = require('../lib/template-helpers.js').templateWrapper;

/*
  Put into own component, keep DRY
*/
function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var SelectorButtonComponent = function( DOMId, number, className, nonNumeric){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDeltaComponent parameter 1 (DOMId): must be a string.");

    if (!nonNumeric) {
	_checkForType( number, "number", "Invalid data type passed to TimeDeltaComponent parameter 2 (number) : must be a number.");
    }

    _checkForType( className, "string", "Invalid data type passed to TimeDeltaComponent parameter 3 (number) : must be a string.");

    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId + '-' + number;
	var $el = $(_internalDOMIdentifier);

	// CoreComponentFields
	var _className = className;
	var _isActive = false;
	var _number = number;

	// Handles Events
	var _actions = [];

	// Node
	var _children = [];
	var _parent = undefined;

	// Weird computed property: This is because our test suite has difficulties recieving this.
	var _active = ( function( ) {
	    return _isActive;
	} );

	var _generateIdentifier = function( ) {
	    if ( _isActive ) {
		return '<div id="' + _internalDOMIdentifier + '" class="' + _className + ' ' + _className + '-active' + '">';
	    } else {
		return '<div id="' + _internalDOMIdentifier + '" class="' + _className + '">';
	    }
	};

	/*
	  View components: _render should only be called on initial render and following this
	  a rerender should be called: JQuery will do this by changing text elements or any 
	  class attributes.
	*/

	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += _generateIdentifier( ) ;
	    tag +=   '<a>' + _number + '</a>';
	    tag += '</div>';
	    return tag;
	};
	
	/*
	  _render: Internal function to remove the element that is current hooked to 
	  our component and following this rerender the HTML: Unless there is some 
	  reason to do so, we should in general keep this used only once, otherwise
	  we should hook JQuery functions to our _handle function, implemented by
	  the ComponentMessanger trait.
	*/
	var _render = function() {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	// Simple internal function to handle events.
	var _pushActiveNumber = function( number ) {
	    _isActive = function(){ return (number === _number) }();
	};

	var _update = function( currentNumberActive ) {
	    var temp = currentNumberActive === _number;
	    if (_isActive !== temp ) {
		_isActive = temp;
		_render( );
	    }
	};

	/*
	 OrderedComponents trait: OrderedComponents will require our object to both
	  implement a _pushParent function which our component can notify, and a 
	  _pushChild function, which our component can receive notification from.
	*/

	/*
	  _pushParent: Pushes a parent to the parent component.
	   Note that this is a top level component so we do not
	   implement this function totally.
	*/
	var _pushParent = function( component ) {
	    _parent = component;
	};

	/*
	  _pushChild: Pushes a child to the internal stack of children components.
	*/
	var _pushChild = function( component ) {
	    //Pass.
	}

	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
	var _display = function ( ) {
	    console.log( `_className: (${_className})` );
	    console.log( `_isActive: (${_isActive})` );
	    console.log( `_number: (${_number})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	/* 
	   HandlesEvents trait: HandlesEvents makes us implement three functions:
	   _pushAction, _setEvent, and _fireEvent. These all function to allow us
	   to push lambdas  to evaluate when an event is fired (possible multiple)
	   and then set the event that will fire these lambdas.
	*/

	/*
	  _pushAction: pushAction takes an evaluatable function and pushes it to 
	  a stack of internal actions: Later on we can set our event that will allow
	  these actions to fire: naturally these actions allow extensibility to 
	  our component and their behavior.
	*/
	var _pushAction = function ( fn ) {
	    _actions.push( fn );
	};

	/*
	  _setEvent: setEvent uses JQuery internally to give an event that will 
	  fire our actions. For example: if we set our event as 'click', all 
	  of our actions will fire when the specific components $el is clicked.
	*/
	var _setEvent = function ( event ) {
	    $el.on( event, function() {
		_fireEvent( );
	    });
	};

	/*
	  _fireEvent: fireEvent is a debug function that allows us to actually 
	  fire and event without actually have a JQuery event specified: this
	  means in test frameworks like Mocha we don't have to implement 
	  JQuery ourselves.
	*/
	var _fireEvent = function( ) {
	    _isActive = true;

	    for (var i of _actions) {
		_actions[i]( );
	    }

	    _notify( );
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
	var _notify = function ( ) {
	    _parent.__handle( {
		active: _isActive,
		id: _number
	    } );
	};

	/* 
	   _handle: _handle will take a JavaScript object and analyize it to do 
	   whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    //pass.
	}

	return {
	    __isActive: _active,
	    __pushActiveNumber: _pushActiveNumber,
	    __number: _number,
	    __display: _display,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __actions: _actions,
	    __render: _render,
	    __parent: _parent,
	    __notify: _notify,
	    __handle: _handle,
	    __fireEvent: _fireEvent,
	    __componentName: "SelectorButtonComponent",
	    setEvent: _setEvent,
	    update: _update,
	    pushAction: _pushAction,
	    pushParent: _pushParent
	};
    })( );
};

module.exports.SelectorButtonComponent = SelectorButtonComponent;
