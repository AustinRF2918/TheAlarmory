var _checkTDInstantiate = function( value ) {
    return (typeof value === "string");
};

var TimeDisplayComponent = function( DOMId ){
    if ( !_checkTDInstantiate( DOMId ) ) {
	throw new ValueError("Invalid data type passed to TimeDisplayComponent constructor: must be a string.");
    }

    return ( function( ) {
	var _internalDOMIdentifier = DOMId;
	var _$jq = $(_internalDOMIdentifier);
	var renderJQ = function() {
	};

	return {
	    _DOMIdentifier: _internalDOMIdentifier,
	    render: renderJQ,
	};
    })( );
};

module.exports.TimeDisplayComponent = TimeDisplayComponent;
