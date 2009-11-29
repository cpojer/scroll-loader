/*
---
description: ScrollLoader

authors:
  - Christoph Pojer

requires:
  core/1.2.4: '*'

provides:
  - scrollloader

license:
  MIT-style license

version:
  1.0

options:
  - area: (number, defaults to *50*) The boundary from the bottom/right where the event is fired in
  - mode: (string, defaults to *vertical*) Either vertical or horizontal for bottom or right
  - container: (element, defaults to *null*) The used element or the window

events:
  - onScroll(): fires when the user reaches a certain boundary specified by the 'area' option
...
*/

(function(){

this.ScrollLoader = new Class({
	
	Implements: [Options, Events],
	
	options: {
		/*onScroll: $empty,*/
		area: 50,
		mode: 'vertical',
		container: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.bound = {scroll: this.scroll.bind(this)};
		this.container = document.id(this.options.container) || window;
		this.attach();
	},
	
	attach: function(){
		this.container.addEvent('scroll', this.bound.scroll);
		return this;
	},
	
	detach: function(){
		this.container.removeEvent('scroll', this.bound.scroll);
		return this;
	},
	
	scroll: function(){
		var z = this.options.mode == 'vertical' ? 'y' : 'x';
		
		var size = this.container.getSize()[z],
			scroll = this.container.getScroll()[z],
			scrollSize = this.container.getScrollSize()[z];
		
		if (scroll + size < scrollSize - this.options.area) return;
		
		this.fireEvent('scroll');
	}
	
});

})();