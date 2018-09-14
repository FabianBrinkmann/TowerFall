/**
 *
 * @param parentMenu
 * @constructor
 */
var Menu = function( parentMenu ) {
	this.parent = parentMenu;
	this.DOMElem = document.createElement( "div" );
	this.menuItems = [];
}

/**
 * Adds a menuItem to the menu.
 * Order matters
 * @param menuItem
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





