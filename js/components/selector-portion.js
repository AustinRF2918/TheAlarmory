// var TimeFormatter = require('../lib/time-formatting.js').TimeFormatter;
// var templateWrapper = require('../lib/template-helpers.js').templateWrapper;

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var SelectorPortionComponent = function( DOMId, name, active){
    _checkForType( DOMId, "string", "Invalid data type passed to SelectorPortionComponent parameter 1 (DOMId): must be a string.");

    _checkForType( name, "string", "Invalid data type passed to SelectorPortionComponent parameter 2 (number) : must be a number.");

    return ( function( ) {
	// CoreComponent
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);

	// CoreComponentFields
	var _name = name;
	var _isActive = false;
	
	var _currentActive = active;

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
	_generateTemplate: Internal function for render: The creates the HTML markup
	for our component. Core view trait requires this to be implemented.
	*/
	var _render = function( ) {
	    $el.append( _generateTemplate( ) );
	};

	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += '<div class="row"><h3 class="text-body">' + _name + '</h3></div><div class="row"><div class="square-container">';
	    for ( var i in _children ) {
		tag += _children[i].__generateTemplate();
	    }

	    tag += '</div></div>';
	    return tag;
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
	    component.pushParent( this );
	    _children.push( component );
	    if (_children.length == 1) {
		component.__fireEvent();
	    }
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
	    if ( _parent ) {
		_parent.__handle( {
		    currentActive: _currentActive,
		    name: _name
		} );
	    }
	};

	/* 
	_handle: _handle will take a JavaScript object and analyize it to do 
	whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    if ( data && data.active ) {
		_currentActive = data.id;

		for ( var i in _children ) {
		    _children[i].__pushActiveNumber( data.id );
		}

		_notify();
	    };
	};

	// General internal utility function to set the current
	// active button in our component.
	var _setActive = function( numeric ) {
	    _isActive = true;
	    _currentActive = numeric;
	};

	var _display = function( ) {
	    console.log( `_isActive: (${_isActive})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `_currentActive: (${_currentActive})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	/*
	_setEvent: setEvent uses JQuery internally to give an event that will 
	fire our actions. For example: if we set our event as 'click', all 
	of our actions will fire when the specific components $el is clicked.
	*/
	var _setEvent = function( event, test ) {
	    $el.on( event, function( ) {
		for (var i = 0; i < _actions.length; i++) {
		    _actions[i]();
		}
	    });
	};

	return {
	    __display: _display,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __actions: _actions,
	    __render: _render,
	    __currentActive: _currentActive,
	    __this: this,
	    __setActive: _setActive,
	    __handle: _handle,
	    __notify: _notify,
	    __componentName: "SelectorPortionComponent",
	    children: _children,
	    setEvent: _setEvent,
	    pushChild: _pushChild,
	    pushParent: _pushParent
	};
    })( );
};

// module.exports.SelectorPortionComponent = SelectorPortionComponent;
