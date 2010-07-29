ScrollLoader - Copyright (c) 2010 [Christoph Pojer](http://cpojer.net/)
=====================================================================================

Fires an event when the user reaches a certain boundary.

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) and [MooTools Class-Extras](http://github.com/cpojer/mootools-class-extras) to be registered to Packager already

	./packager register /path/to/scroll-loader
	./packager build ScrollLoader/* > scroll-loader.js

How to use
----------

See Demos/index.html

You can create an instance of ScrollLoader via the following code

	new ScrollLoader({
		onScroll: function(){
			// User has reached a certain boundary
			// Let's make a Request for new content
			
			this.detach(); // While waiting, we detach the listener so the event does not fire accidentally
			
			var scroll = this; // Save a reference
			new Request(url, {
				onSuccess: function(text){
					new Element('div', {text: text}).inject(myElement); // Add the new content
					
					scroll.attach(); // Attach the event again so the event fires when you hit the bottom again
				}
			}).get();
		}
	});

Configurable Options / Events
-----------------------------

Options
* area: (number, defaults to *50*) The boundary from the bottom/right where the event is fired in
* mode: (string, defaults to *vertical*) Either vertical or horizontal for bottom or right
* container: (element, defaults to *null*) The used element or the window

Events
* scroll - fires when the user reaches a certain boundary specified by the 'area' option