function styleBackdrop( $selector, bg ) {
}

var Modal = function( background, color, selector ) {
    this.bg = background ? background : 'black';
    this.fg = color ? color : 'white';
    this.sl = selector ? selector : 'general-modal';

    this.el = $('<div>').addClass(this.sl);
    this._loaded = false;

    this._init = function() {
	styleBackdrop(this.el, this.bg);
	this._loaded = true;
    };

    this.append = function( modal, lOff, tOff, width, height) {
	modal._init();
	this.el.append(modal.el);
    };

    this.show = function() {
	if (!this._loaded) {
	    this._init();
	}

	$(document.body).append(this.el);
	this.el.removeClass('hidden');
    };
};
