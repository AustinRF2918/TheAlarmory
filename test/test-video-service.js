var expect = chai.expect;
$ = jQuery;

describe('Video service sends queries.', function() {
    describe('ID Checking', function() {
	it ('Should reject garbage data.', function() {
	    var videoService = VideoService();
	    videoService.sendId("fdsafdsafdas");
	    this.timeout(500);
	    setTimeout(done, 500);
	    function done() {
		console.log(videoService.getPending());
		expect(videoService.getPending()).to.equal(null);
	    }
	});

	it ('Should accept Primus data.', function() {
	    var videoService = VideoService();
	    var vidId = "953PkxFNiko";
	    videoService.sendId(vidId);
	    this.timeout(900);
	    setTimeout(done, 900);
	    function done() {
		console.log(videoService.getPending());
		expect(videoService.getPending()).to.equal(`https://www.youtube.com/watch?v=${vidId}`);
	    }
	});

	it ('Should interrupt Primus data.', function() {
	    this.timeout(900);

	    var videoService = VideoService();

	    function done() {
		console.log(videoService.getPending());
		expect(videoService.getPending()).to.equal(null);
	    }

	    setTimeout(function() {
		var vidId = "953PkxFNiko";
		videoService.sendId(vidId);
		videoService.sendId("fdsafdsafdas");
		done();
	    }, 900);
	});
    });

    describe('Parameter Querying', function() {
	it ('Should get Primus keyword parameters.', function() {
	    this.timeout(2000);

	    var videoService = VideoService();

	    function done() {
		var v = videoService.getPending();
		expect(v).to.equal(null);
	    }

	    setTimeout(function() {
		var parameters = ["Primus", "My", "Name"];
		videoService.sendParameters(parameters);
		done();
	    }, 2000);
	});

	it ('Should get nothing from garbage keyword parameters.', function() {
	    this.timeout(900);

	    var videoService = VideoService();

	    function done() {
		console.log(videoService.getPending());
		expect(videoService.getPending()).to.equal(null);
	    }

	    setTimeout(function() {
		var parameters = ["adsjkadjskaj", "jafskajfska", "jdksajdks"];
		videoService.sendParameters(parameters);
		done();
	    }, 900);
	});
    });
});
