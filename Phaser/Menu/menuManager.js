/**
 *
 * @param menus
 * @type Menu[]
 * @constructor
 */
var MenuManager = function( menus ) {
	this.menus = menus;
	this.DOMElem = document.createElement( "div" );
	this.DOMElem.classList.add( "menu-manager" );
}

/**
 * Returns the DOMElement
 * @return {HTMLElement}
 */
MenuManager.prototype.getElement = function() {
	return this.DOMElem;
}

/**
 * Create the HTML of the menus
 * @return void
 */
MenuManager.prototype.createHTML = function() {
	this.menus.forEach( function( menu, index ) {
		menu.createHTML();
		if(index===0)
			menu.show();
		else
			menu.hide();

		this.DOMElem.appendChild(menu.getElement());
	}.bind(this) )
}

/**
 * Sets the first menu to visible
 * @return void
 */
MenuManager.prototype.show = function() {

}