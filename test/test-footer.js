var expect = chai.expect;

describe('Full Footer', function() {
    describe('Properly constructs', function() {
	it ('Should construct on demand.', function() {
	    var videoComponent = VideoInputComponent( "Hello" );
	    var footer = FooterComponent( "page-footer" );

	    footer.pushChild(videoComponent);
	    expect(footer.__generateTemplate()).to.equal('<div class="inline-section"><div class="col-lg-8"><input type="video" class="form-control footer footer-red" id="video-form" placeholder="Paste a video URL here to wake up to it!"/></div><div class="col-lg-4"><a class="btn header footer footer-blue" href="http://www.bluebikedesign.com">Created By Blue Bike Web Design</a></div></div>');
	});

	it ('Should throw when no DOM element is passed.', function() {
	    expect( function() {
		var footer = FooterComponent( );
	    }).to.throw( );
	});

	it ('Should not throw when invalid numerics are passed.', function() {
	    expect( function() {
		var footer = FooterComponent( 2 );
	    }).to.throw( );
	});

	it ('Should have internal identifiers accessable.', function() {
	    var footer = FooterComponent( "Hello" );
	    expect( footer.__DOMIdentifier != undefined ).to.be.true;
	});

	it ('Should be differentiatable.', function() {
	    var footerFirst = FooterComponent( "Hello" );
	    var footerSecond = FooterComponent( "World" );
	    expect( footerFirst !== footerSecond ).to.be.true;
	});
    });
});
