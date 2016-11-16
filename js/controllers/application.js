$(document).on('click', 'video', function(){
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
});

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}

var ApplicationController = function( ) {
    return ( function( ) {
	var _children = [];
	var _parent = undefined;
	var _alarmSound = new Audio('../sounds/alarm.wav');
	_alarmSound.loop = true;

	/*
	 OrderedComponents trait: OrderedComponents will require our object to both
	  implement a _pushParent function which our component can notify, and a
	  _pushChild function, which our component can receive notification from.
	*/
	/*

	  _pushParent: Pushes a parent to the parent component.
	   Note that this is a top level component so we do not
	   implement this function totally.
	*/
	var _pushParent = function( component ) {
	    // Dummy Component
	};

	/*
	  _pushChild: Pushes a child to the internal stack of children components.
	*/
	var _pushChild = function( component ) {
	    component.pushParent( this );
	    _children.push( component );
	};


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
	  the ComponentMessanger trait.
	*/
	var _render = function( ) {
	    for ( var i in _children ) {
		_children[i].__render();
	    }
	};

	/*
	  _getComponentMatches: Takes an argument componentName and searches the internal
	  stack to find a component with the passed name: Note that the JavaScript object
	  must actually have a __componentName field to be able to utilize this function,
	  otherwise the map will basically fail.
	*/
	var _getComponentMatches = function( componentName ) {
	    return _children.filter( function( item ) {
		return item.__componentName === componentName;
	    } );
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
	var _notify = function( componentName, payload ) {
	    matches = _getComponentMatches( componentName );

	    for ( var i = 0; i < matches.length; i++ ) {
		matches[i].__handle(
		    payload
		);
	    }
	};

	/*
	   _handle: _handle will take a JavaScript object and analyize it to do
	   whatever actions it needs to do.
	*/
	var _handle = function( data ) {
	    var that = this;

	    var getActiveTimes = function( ) {
		return  _getComponentMatches( "ControlPanelComponent" ).map( function( item ) {
		    return item.getActiveTimes();
		} )[0];
	    };

	    var refreshDisplays = function( data ) {
		_notify( 'TimeDeltaComponent', data );
		_notify( 'TimeDisplayComponent', data );
		_notify( 'TimeDeltaComponent', data );
	    };


	    var fireModal = function( ) {
		var modal = ModalWindow( that );
		modal.__render();
		_children.push(modal);
	    };

	    var snoozeTime = function( delta ) {
		lsNew = getActiveTimes();
		var elevenThen = (lsNew[0] === 11);
		lsNew[1] += delta;

		console.log(lsNew[1]);
		console.log(60 - delta);
		console.log("HI");

		if ( lsNew[1] > 59 ) {
		    console.log("TRUEEE");
		    // PRONE TO BUGS: WHAT IF ALARM HAS GONE FOR MORE THAN AN HOUR?
		    lsNew[1] = lsNew[1] % 60;
		    lsNew[0] += 1;
		    // PRONE TO BUGS
		    var elevenNow = (lsNew[0] === 11);

		    // Pushdown Autonoma here.
		    if ( !elevenThen && elevenNow ) {
			if ( lsNew[2] === "PM" ) {
			    lsNew[2] = "AM";
			} else {
			    lsNew[2] = "PM";
			}
		    } else if ( lsNew[0] > 12 ) {
			lsNew[0] = 1;
		    }
		}

		return lsNew;
	    };

	    if ( data ) {
		if ( data.componentName === "ControlPanelComponent" ) {
		    refreshDisplays( data );
		} else if ( data.componentName === "TimeDeltaComponent" ) {
		    if ( data.firing ) {
			if ( _getComponentMatches( "ModalComponent" ).length === 0 ) {
			    fireModal();
			}
		    }
		} else if ( data.componentName === "ModalButtonComponent" ) {
		    if (data.snooze) {
		        var ControlPanel = _getComponentMatches( "ControlPanelComponent" )[0];

			ControlPanel.__handle( {
			    componentName: "ApplicationController",
			    list: snoozeTime( Math.floor(data.timeElapsed) + 6  )
			});

			_children.pop();
		    } else if (data.wake) {
			location.reload();
		    } 
		}
	    }
	};

	// Debug function: Because this is ES6 syntax, we should disable these on
	// deployment of the website.
	var _display = function( ) {
	    for ( var i in _children ) {
		_children[i].__display();
	    }
	};

	var _init = function() {
	    for ( var i in _children ) {
		if (!_children[i].__currentActive === undefined) {
		    _children[i].__notify(_children[i].__currentActive);
		}
	    }
	};

	return {
	    __children: _children,
	    __getComponentMatches: _getComponentMatches,
	    __handle: _handle,
	    __notify: _notify,
	    init: _init,
	    pushChild: _pushChild
	};
    })( );
};

// module.exports.ApplicationController = ApplicationController;
