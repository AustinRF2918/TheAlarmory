var VideoService = function( ) {
    return ( function( ) {
	var _cached;
	var _currentRequest;

	var _resetState = function( ) {
	    if (_cached) {
		_currentRequest.abort();
	    }
	}

	var _sendId = function( id ) {
	    _resetState();

	    _currentRequest = jQuery.ajax({
		url: 'http://127.0.0.1:5000/v1/id/' + id,
		dataType: 'json',
		success: function ( json ) {
		    if ( json.toString() ) {
			_cached = json.toString();
		    }
		}
	    });
	}

	var _sendParameters = function( parameters ) {
	    _resetState();

	    _currentRequest = jQuery.ajax({
		url: 'http://127.0.0.1:5000/v1/video/' + parameters.join('+'),
		dataType: 'json',
		success: function (json) {
		    if ( json.toString() ) {
			_cached = json.toString();
		    }
		}
	    });
	}

	var _getPending = function( ) {
	    try {
		if ( !_cached ) {
		    return null;
		} else {
		    var r = _cached;
		    console.log(r);
		    _cached = undefined;
		    return r;
		}
	    } catch( e ) {
		_cached = undefined;
		return null;
	    }
	}

	return {
	    sendId: _sendId,
	    sendParameters: _sendParameters,
	    getPending: _getPending
	};
    } )();
};
