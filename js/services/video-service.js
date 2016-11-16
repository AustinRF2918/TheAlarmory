var VideoService = function( ) {
    return ( function( ) {
	var _cached;
	var _currentRequest;

	var _sendId = function( id ) {
	    var url = null;
	    try {
		_currentRequest.abort();
	    } catch(e) {
	    }

	    _currentRequest = jQuery.ajax({
	    url: 'http://127.0.0.1:5000/v1/id/' + id,
	    dataType: 'json',
	    success: function (json) {
		try {
		    if (json.toString() !== '') {
			_cached = json.toString();
		    }
		} catch(e) {
		}
	    }
	    });
	}

	var _sendParameters = function( parameters ) {
	    try {
		_currentRequest.abort();
	    } catch(e) {
	    }

	    _currentRequest = jQuery.ajax({
		url: 'http://127.0.0.1:5000/v1/video/' + parameters.join('+'),
		dataType: 'json',
		success: function (json) {
		    try {
			if (json.toString() !== '') {
			    _cached = json.toString();
			}
		    } catch(e) {
		    }
		}
	    });
	}

	return {
	    sendId: _sendId,
	    sendParameters: _sendParameters,
	    getPending: function() {
		try {
		    if (_cached === undefined) {
			return null;
		    } else {
			return _cached;
		    }
		} catch (e) {
		    return null;
		}
	    }
	};
    } )();
};
