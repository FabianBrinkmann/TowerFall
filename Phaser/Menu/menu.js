/**
 *
 * @param parentMenu
 * @type Menu
 * @constructor
 */
var Menu = function( parentMenu ) {
	this.parent = parentMenu;
	if(this.parent)
		this.backItem = new BackMenuItem(this, parentMenu);
	this.DOMElem = document.createElement( "div" );
	this.DOMElem.classList.add( "menu" );
	this.menuItems = [];
}

/**
 * Adds a menuItem to the menu.
 * Order matters
 * @param menuItem
 * @type MenuItem
 * @return void
 */
Menu.prototype.addItem = function( menuItem ) {
	this.menuItems.push( menuItem );

}

/**
 * Creates the HTML of the menu including menuitems
 * @return void
 */
Menu.prototype.createHTML = function() {
	this.menuItems.forEach( function( menuItem ) {
		menuItem.createHTML();
		var itemElem = menuItem.getElement();
		this.DOMElem.appendChild(menuItem.getElement());
	}.bind(this) );
	if(this.backItem){
		this.backItem.createHTML();
		this.DOMElem.appendChild(this.backItem.getElement());
	}

}

/**
 * Returns the DOMElement
 * @return {HTMLElement}
 */
Menu.prototype.getElement = function() {
	return this.DOMElem;
}

/**
 * Returns the ParentMenu or null if this is the root menu
 * @return {Menu}
 */
Menu.prototype.getParent = function() {
	return this.parent;
}

/**
 * Shows the menu by setting style display:block
 * @return void
 */
Menu.prototype.show = function() {
	this.DOMElem.style.display = "block";
}

/**
 * Hides the menu by setting stlye display:none
 * @return void
 */
Menu.prototype.hide = function() {
	this.DOMElem.style.display = "none";
}





