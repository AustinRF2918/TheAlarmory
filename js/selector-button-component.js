var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var templateWrapper = require('../js/template-helpers.js').templateWrapper;

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var SelectorButtonComponent = function( DOMId, number, className){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDeltaComponent parameter 1 (DOMId): must be a string.");

    _checkForType( number, "number", "Invalid data type passed to TimeDeltaComponent parameter 2 (number) : must be a number.");

    _checkForType( className, "string", "Invalid data type passed to TimeDeltaComponent parameter 3 (number) : must be a string.");

    return ( function( ) {
	var _internalDOMIdentifier = DOMId + '-' + number;
	var $el = $(_internalDOMIdentifier);

	var _className = className;
	var _isActive = false;
	var _number = number;

	var _actions = [];

	var _children = [];
	var _parent = undefined;

	var _generateIdentifier = function( ) {
	    if ( _isActive ) {
		return '<div id="' + _internalDOMIdentifier + '" class="' + _className + ' ' + _className + '-active' + '">';
	    } else {
		return '<div id="' + _internalDOMIdentifier + '" class="' + _className + '">';
	    }
	};

	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += _generateIdentifier( ) ;
	    tag +=   '<a>' + _number + '</a>';
	    tag += '</div>';
	    return tag;
	};
	
	var _render = function() {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	var _pushActiveNumber = function( number ) {
	    _isActive = function(){ return (number === _number) }();
	};

	var _pushParent = function( component ) {
	    _parent = component;
	};

	var _update = function( currentNumberActive ) {
	    var temp = currentNumberActive === _number;
	    if (_isActive !== temp ) {
		_isActive = temp;
		_render( );
	    }
	};

	var _display = function ( ) {
	    console.log( `_className: (${_className})` );
	    console.log( `_isActive: (${_isActive})` );
	    console.log( `_number: (${_number})` );
	    console.log( `_action: (${_actions})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	var _pushAction = function ( fn ) {
	    _actions.push(fn);
	};

	var _setEvent = function ( event ) {
	    $el.on( event, function() {
	        _isActive = true;

		for (var i = 0; i < _actions.length; i++) {
		    _actions[i]();
		}

		_notify();
	    });
	};

	var _fireEvent = function( ) {
	    _isActive = true;

	    for (var i = 0; i < _actions.length; i++) {
		_actions[i]( );
	    }

	    _notify( );
	};

	var _notify = function ( ) {
	    _parent.__handle( {
		active: _isActive,
		id: _number
	    } );
	};

	return {
	    __pushActiveNumber: _pushActiveNumber,
	    __number: _number,
	    __display: _display,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __actions: _actions,
	    __render: _render,
	    __parent: _parent,
	    __notify: _notify,
	    __fireEvent: _fireEvent,
	    setEvent: _setEvent,
	    update: _update,
	    pushAction: _pushAction,
	    pushParent: _pushParent
	};
    })( );
};

module.exports.SelectorButtonComponent = SelectorButtonComponent;
