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

	var _isActive = false;
	var _actions = [];
	var _components = [];
	var _name = name;

	var _currentActive = undefined;

	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += '<div class="row"><h3 class="text-body">' + _name + '</h3></div><div class="row" id="' + DOMId + '"' + '>';
	    for ( var i = 0; i < _components.length; i++) {
		tag += _components[i].__generateTemplate();
	    }

	    tag += '</div>';
	    return tag;
	};

	var _pushChild = ( function( component, parent ) {
	    component.pushParent( this );
	    _components.push( component );
	} );

	var _handle = function( data ) {
	    if ( data.active ) {
		_currentActive = data.id;
		for ( var i = 0; i < _components.length; i++) {
		    _components[i].__pushActiveNumber( data.id );
		}
	    };
	};

	var _setActive = function( numeric ) {
	    _currentActive = numeric;
	};

	var _render = function() {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	var _display = function ( ) {
	    console.log( `_isActive: (${_isActive})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `_currentActive: (${_currentActive})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	var _setEvent = function ( event, test ) {
	    $el.on( event, function() {
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
	    setEvent: _setEvent,
	    pushChild: _pushChild
	};
    })( );
};

module.exports.SelectorPortionComponent = SelectorPortionComponent;
