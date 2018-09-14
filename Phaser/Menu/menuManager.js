/**
 *
 * @param menus
 * @constructor
 */
var MenuManager = function( menus ) {
	this.menus = menus;
	this.DOMElem = document.createElement("div");
}

/**
 * Returns the DOMElement
 * @return {HTMLElement}
 */
MenuManager.prototype.getElement = function(){
	return this.DOMElem;
}

/**
 * Create the HTML of the menus
 * @return void
 */
MenuManager.prototype.createHTML = function() {

}

/**
 * Sets the first menu to visible
 * @return void
 */
MenuManager.prototype.show = function() {

}