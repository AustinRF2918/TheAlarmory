var ModalWindow = function( parent ){
    return ( function( ) {
	// CoreComponent
	var $el = $("#modal-generator");
	var _internalDOMIdentifier = "modal-generator";

	// CoreComponentFields
	var _currentText = "Time's Up!";

	// Handles Events
	var _actions = [];

	// Node
	var _children = [];
	var _parent = parent;

	// Alarm Clock Noise 
	var _internalAudio = new Audio('../sounds/alarm.wav');
	_internalAudio.loop = true;

	// Timer to manipulate timing.
	// TODO: watch out for more than an hour snooze!
	var _then = new Date();


	/*
	  View components: _render should only be called on initial render and following this
	  a rerender should be called: JQuery will do this by changing text elements or any 
	  class attributes.
	*/

	/*
	  _render: Internal function to remove the element that is current hooked to 
	  our component and following this rerender the HTML: Unless there is some 
	  reason to do so, we should in general keep this used only once, otherwise
	  we should hook JQuery functions to our _handle function, implemented by
	  the ComponentMessanger trait. Here render plays a double role: turning on the 
	  alarm.
	*/
	var _render = function() {

	    $.when($el.append( _generateTemplate( ) )).then(function() {
		var player = $("#player").html.toString();
		if ( $("#video-form").val() === '' || player.indexOf("Cannot GET") === 0)  {
		    _internalAudio.play();
		} 

		setTimeout(function() {
		    $(".modal-overlay").removeClass("modal-transition");
		    }, 500);

		    $("#btn-wake-up").click(function() {
			_parent.__handle({
			    componentName: "ModalButtonComponent",
			    wake: true
			});

			_internalAudio.pause();
			_removeModal();
		    });

		    $("#btn-snooze").click(function() {
			var now = new Date();
			var delta = ( (now.getTime() - _then.getTime()) / 60000 ); 
			console.log(delta);

			_parent.__handle({
			    componentName: "ModalButtonComponent",
			    snooze: true,
			    timeElapsed: delta

		    });
		    _internalAudio.pause();
		    _removeModal();
		});
	    });
	}


	/*
	  _generateTemplate: Internal function for render: The creates the HTML markup
	  for our component. Core view trait requires this to be implemented.
	*/
	var _generateTemplate = function() {
	    var vidId =  $("#video-form").val().split("=")[1];
	    var tag = '';
	    tag += '<div class="lightbox">';
	    tag += '</div>';
	    if ( $("#video-form").val() != '' ) {
		tag += '<div id="video-overlay">';
		tag += '</div>';
		tag += '<iframe id="player" frameborder="0" width="640" height="390"';
		tag += ( 'src="' + $("#video-form").val().replace("watch?v=", "embed/") + '?autoplay=1&html5=true&loop=true&playlist=' + vidId + '">' );
		tag += '</iframe>';
	    }
	    tag += '<div class="modal-overlay modal-transition">';
	    tag +=   '<div class="modal-window">';

	    // WE NEED SANITIZATION THIS IS BUGGY !
	    if ( $("#video-form").val() != '' ) {
	      tag +=     '<div class="modal-body-video">';
	    } else {
	      tag +=     '<div class="modal-body">';
	    }
	    
	    if ( $("#video-form").val() == '' ) {
	      tag +=     '<h5 class="modal-header">';
	      tag +=       _currentText;
	      tag +=     '</h5>';
	    }
	    tag +=       '<div class="btn-container">';
	    tag +=       '<a id="btn-wake-up" class="btn btn-modal">';
	    tag +=         'Wake Up';
	    tag +=       '</a>';
	    tag +=       '<a id="btn-snooze" class="btn btn-modal">';
	    tag +=         'Snooze';
	    tag +=       '</a>';
	    tag +=       '</div>';
	    tag +=     '</div>';
	    tag +=   '</div>';
	    tag += '</div>';
	    return tag;
	};

	/*
	 OrderedComponents trait: OrderedComponents will require our object to both
	  implement a _pushParent function which our component can notify, and a 
	  _pushChild function, which our component can receive notification from.
	*/

	/*
	  _pushChild: Pushes a child to the internal stack of children components.
	*/
	var _pushChild = function( component ) {
	    // Pass
	};

	/*
	  _pushParent: Pushes a parent to the parent component.
	   Note that this is a top level component so we do not
	   implement this function totally.
	*/
	var _pushParent = function( component ) {
	    _parent = component;
	};

	var _removeModal = function( ) {
	    $(".modal-overlay").addClass("modal-transition");

	    setTimeout(function() {
		$("#modal-generator").empty();
	    }, 1000);
	};
	
	var _update = function( hour, minute, period ) {
	    _render( );
	};

	/* 
	   Node trait: Node means we have to implement _notify and _handle:
	   both of these allow our component to send and recieve events 
	   and messages from other components respectively.
	*/

	/* 
	   _notify: notify sends our parent a handle function with a JavaScript
	   object: our parent is then free to implement handle in whatever way
	   it sees fit to handle messaging between components. 
	*/
	var _notify = function( ) {
	    // TimeDeltaComponent is not interactive: Thus no notification will ever be needed.
	};

	/* 
	   _handle: _handle will take a JavaScript object and analyize it to do 
	   whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    // Pass.
	};

	return {
	    __generateTemplate: _generateTemplate,
	    __componentName: "ModalComponent",
	    __handle: _handle,
	    __notify: _notify,
	    __render: _render,
	    pushParent: _pushParent,
	    pushChild: _pushChild,
	    update: _update
	};
    })( );
};

