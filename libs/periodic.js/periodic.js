function PeriodicJS() {

	var options = {};

	var _elapsed;
	var _startTime;
	var _timeUntilUpdate = 0;
	var _rAF;
	var _hasRunAtLeastOnce = false;

	function display(time) {

		// find the current displayed time
		var element = document.querySelector(options.displaySelector);
		var currentDisplayedTime = element.innerHTML;

		// format incoming time
		var formattedTime = Math.ceil(time/1000);

		// don't update dom element with same string
		if (formattedTime.toString() !== currentDisplayedTime) {
			element.innerHTML = 'update in ' + formattedTime;
		}

	}

	function stop() {
		cancelAnimationFrame(_rAF);
		var node = document.querySelector(options.displaySelector);
		if (node) {
			node.parentNode.removeChild(node);
		}
	}

	function draw() {

		_rAF = requestAnimationFrame(draw);

		if (!_startTime) {
			_startTime = new Date().getTime();
		}

		var now = new Date().getTime();

		// how much time has passed since we started?
		_elapsed = now - _startTime;

		// how much time is left until we update?
		_timeUntilUpdate = (_hasRunAtLeastOnce ? options.duration : 0) - _elapsed;

		if (_timeUntilUpdate <= 0) {

			// time's up - stop rAF!
			cancelAnimationFrame(_rAF);

			// reset startTime
			_startTime = null;

			// we've now run this at least once
			_hasRunAtLeastOnce = true;

			// run the update - whatever it is
			options.update();

		} else {

			// show how much time until update
			options.display(_timeUntilUpdate);

		}

	}

	function setup(opts) {

		// default to 1 minute
		options.duration = opts.duration || 60*1000;

		// on every time change
		// call the provided display function, if not null,
		// otherwise call the default display function
		options.display = opts.display || display;

		// if options.display is not null,
		// the provided displaySelector will be ignored
		options.displaySelector = opts.displaySelector || '.periodicjs';

		options.update = opts.update;

	}

	return {
		setup: setup,
		run: draw,
		stop: stop
	};
	
}