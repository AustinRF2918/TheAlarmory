var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var templateWrapper = require('../js/template-helpers.js').templateWrapper;

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var SelectorPortionComponent = function( DOMId, name ){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDeltaComponent parameter 1 (DOMId): must be a string.");

    _checkForType( name, "string", "Invalid data type passed to TimeDeltaComponent parameter 2 (number) : must be a number.");

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);
	var _name = name;

	var _isActive = false;
	var _currentActive = undefined;

	var _actions = [];

	var _children = [];
	var _parent = undefined;

	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += '<div class="row"><h3 class="text-body">' + _name + '</h3></div><div class="row" id="' + DOMId + '"' + '>';
	    for ( var i = 0; i < _children.length; i++) {
		tag += _children[i].__generateTemplate();
	    }

	    tag += '</div>';
	    return tag;
	};

	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};

	var _pushParent = function( component ) {
	    _parent = component;
	};

	var _handle = function( data ) {
	    if ( data && data.active ) {
		_currentActive = data.id;

		for ( var i = 0; i < _children.length; i++) {
		    _children[i].__pushActiveNumber( data.id );
		}

		_notify();
	    };
	};

	var _notify = function( ) {
	    if ( _parent ) {
		_parent.__handle( {
		    currentActive: _currentActive,
		    name: _name
		} );
	    }
	};

	var _setActive = function( numeric ) {
	    _currentActive = numeric;
	};

	var _render = function( ) {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	var _display = function( ) {
	    console.log( `_isActive: (${_isActive})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `_currentActive: (${_currentActive})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

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
	    setEvent: _setEvent,
	    pushChild: _pushChild,
	    pushParent: _pushParent
	};
    })( );
};

module.exports.SelectorPortionComponent = SelectorPortionComponent;
