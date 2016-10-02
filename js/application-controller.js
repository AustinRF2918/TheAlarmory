function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var ApplicationController = function( ) {
    return ( function( ) {
	var _children = [];

	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};

	var _render = function( ) {
	    for ( var i = 0; i < _children.length; i++ ) {
		_children[i].__render();
	    }
	};

	var _init = function( ) {
	};

	var _getComponentMatches = function( componentName ) {
	    return _children.filter( function( item ) {
		return item.__componentName === componentName;
	    } );
	};

	var _notify = function( componentName, payload ) {

	    matches = _getComponentMatches( componentName );

	    for ( var i = 0; i < matches.length; i++ ) {
		matches[i].__handle(
		    payload
		);
	    }
	};

	var _handle = function( data ) {
	    console.log( data );
	    if ( data ) {
		if ( data.componentName === "ControlPanelComponent" ) {
		    _notify( 'TimeDeltaComponent', data );
		    _notify( 'TimeDisplayComponent', data );
		}
	    }
	};

	var _display = function( ) {
	    for ( var i = 0; i < _children.length; i++ ) {
		_children[i].__display();
	    }
	};

	return {
	    __children: _children,
	    __getComponentMatches: _getComponentMatches,
	    __handle: _handle,
	    __notify: _notify,
	    pushChild: _pushChild
	};
    })( );
};

module.exports.ApplicationController = ApplicationController;
