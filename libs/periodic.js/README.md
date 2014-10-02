# periodic.js

## Install

- `bower install periodic.js`

## Dependencies

- [requestAnimationFrame](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) - you'll need this to support legacy browsers.

## Usage

``` javascript
var periodic = PeriodicJS();

periodic.setup({
	duration: 5000, // in milliseconds - defaults to 1 minute,
	displaySelector: '.updater' // defaults to .periodicjs
	update: function() {
		// this function will run every <duration> milliseconds
		doSomething();
	}
});

function doSomething() {
	// do something here
	
	// resume periodic
	periodic.run();
}

// finally, start the whole thing
periodic.run();
```

Also add an element with the `displaySelector` class you provided earlier:

``` html
<p class='updater'></p>
```

Call `stop()` when you want to stop:

``` javascript
periodic.stop();
```

See `index.html` for a full example.


## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
