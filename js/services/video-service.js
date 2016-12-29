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
	    if ( _currentRequest ) {
	      _currentRequest.abort();
	    }

	    if ( _ct ) {
		clearTimeout(_ct);
	    }

	    _ct = setTimeout(function() {
		if ( !_pullID(data) ) {
		    _sendParameters(data.split(' '));
		} else {
		    _sendID( data );
		}
	    }, 1000);
	}

	var _sendId = function( id ) {
	    _currentRequest = jQuery.get('http://127.0.0.1:5000/v1/id/' + id).done(function(data) {
		_messanger.handle({
		    videoName: null,
		    videoUrl: data,
		    status: 400 // for now
		});
	    });
	}

	var _sendParameters = function( parameters ) {
	    _currentRequest = jQuery.get('http://127.0.0.1:5000/v1/video/' + parameters.join('+')).done(function(data) {
		_messanger.handle({
		    componentName: "VideoService",
		    videoName: null,
		    url: data,
		    status: 400 //for now
		});
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
