var VideoService = function( ) {
    return ( function( ) {
	var _cached;
	var _currentRequest = null;
	var _messanger;
	var _ct;

	var _setMessanger = function( m ) {
	    _messanger = m;
	}

	// Pulled from stack overflow.
	var _pullID = function( data ) {
	    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	    var match = data.match(regExp);

	    if (match && match[2].length == 11) {
		return match[2];
	    } else {
		return null;
	    }
	}

	var _sendUnknown = function( data ) {
	    if (_currentRequest) {
	      _currentRequest.abort();
	    }

	    clearTimeout(_ct);

	    _ct = setTimeout(function() {
		console.log("Performing timeout.");
		var videoID = _pullID(data);

		if ( videoID === null ) {
		    _sendParameters(data.split(' '));
		    clearTimeout(_ct);
		} else {
		    _sendID( data );
		    clearTimeout(_ct);
		}
	    }, 1000);
	}

	var _sendId = function( id ) {
	    var cr = _currentRequest;
	    _currentRequest = jQuery.ajax({
		async: false,
		url: 'http://127.0.0.1:5000/v1/id/' + id,
		dataType: 'json',
		beforeSend: function() {
		    if ( cr != null) {
			cr.abort();
		    }
		},
		success: function( json ) {
		    if ( json.toString() ) {
			_cached = json.toString();
			_messanger.receive(_cached);
		    }
		},

		failure: function( json ) {
		    _cached = null;
		}
	    });
	}

	var _sendParameters = function( parameters ) {
	    console.log("Sending ID.");
	    var cr = _currentRequest;

	    cr = jQuery.get('http://127.0.0.1:5000/v1/video/' + parameters.join('+')).done(function(data) {
		alert(data);
	    });
	}

	var _getPending = function( ) {
	    var r = _cached;
	    try {
		if ( !_cached ) {
		    console.log(r);
		    return null;
		} else {
		    console.log(r);
		    _cached = null;
		    return r;
		}
	    } catch( e ) {
		_cached = null;
		return null;
	    }
	}

	return {
	    sendId: _sendId,
	    sendParameters: _sendParameters,
	    sendUnknown: _sendUnknown,
	    getPending: _getPending,
	    setMessanger: _setMessanger
	};
    } )();
};
