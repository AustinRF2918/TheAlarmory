var TimeFormatter = require('../js/time-formatting.js').TimeFormatter;
var templateWrapper = require('../js/template-helpers.js').templateWrapper;

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var ControlPanelComponent = function( DOMId, name ){
    _checkForType( DOMId, "string", "Invalid data type passed to TimeDeltaComponent parameter 1 (DOMId): must be a string.");

    _checkForType( name, "string", "Invalid data type passed to TimeDeltaComponent parameter 2 (number) : must be a number.");

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var $el = $(_internalDOMIdentifier);
	var _name = name;

	var _hourActive = false;
	var _minuteActive = false;
	var _periodActive = false;

	var _actions = [];

	var _children = [];
	var _parent = undefined;

	var _generateTemplate = function( ) {
	    var tag = '';
	    tag += '<div class="col-md-8">';

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
	    if ( data ) {
		if ( data.name === "Hours" ) {
		    _hourActive = data.currentActive;
		} else if ( data.name === "Minutes" ) {
		    _minuteActive = data.currentActive;
		} else if ( data.name === "AM/PM" ) {
		    _periodActive = data.currentActive;
		}

		_notify();
	    };
	};

	var _notify = function( ) {
	    if ( _parent ) {
		_parent.__handle( {
		    hourActive: _hourActive,
		    minuteActive: _minuteActive,
		    periodActive: _periodActive,
		    name: _name
		} );
	    }
	};

	var _render = function( ) {
	    $el.remove( );
	    $el.html( _generateTemplate( ) );
	};

	var _display = function( ) {
	    console.log( `_hourActive: (${_hourActive})` );
	    console.log( `_minuteActive: (${_minuteActive})` );
	    console.log( `_periodActive: (${_periodActive})` );
	    console.log( `html: (${_generateTemplate()})` );
	};

	return {
	    __display: _display,
	    __DOMIdentifier: _internalDOMIdentifier,
	    __generateTemplate: _generateTemplate,
	    __actions: _actions,
	    __render: _render,
	    __this: this,
	    __handle: _handle,
	    __notify: _notify,
	    pushChild: _pushChild,
	    pushParent: _pushParent
	};
    })( );
};

module.exports.ControlPanelComponent = ControlPanelComponent;
