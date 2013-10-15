/*
---

name: ScrollLoader

description: Provides the ability to load more content when a user reaches the end of a page.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Events, Core/Options, Core/Element.Event, Core/Element.Dimensions]

provides: ScrollLoader

...
*/

(function(){

this.ScrollLoader = new Class({
	
	Implements: [Options, Events],
	
	options: {
		/*onScroll: fn,*/
		area: 50,
		mode: 'vertical',
		container: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element = document.id(this.options.container) || window;
		this.bound = this.scroll.bind(this);
		this.attach();
	},
	
	attach: function(){
		this.element.addEvent('scroll', this.bound);
		return this;
	},
	
	detach: function(){
		this.element.removeEvent('scroll', this.bound);
		return this;
	},
	
	scroll: function(){
		var z = (this.options.mode == 'vertical') ? 'y' : 'x';
		
		var element = this.element,
			size = element.getSize()[z],
			scroll = element.getScroll()[z],
			scrollSize = element.getScrollSize()[z];
		
		if (scroll + size < scrollSize - this.options.area) return;
		
		this.fireEvent('scroll');
	}
	
});

}).call(this);
