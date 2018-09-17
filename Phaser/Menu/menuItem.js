/**
 *
 * @param menu
 * @param text
 * @constructor
 * @abstract
 */
var MenuItem = function( menu, text ) {
	this.text = text;
	this.DOMElem = document.createElement( "div" );
	this.DOMElem.classList.add("menu-item");
	this.DOMElem.onclick = this.onClick.bind(this);
	this.menu = menu;
}

/**
 * Returns the menu the item is associated with
 * @returns Menu
 */
MenuItem.prototype.getMenu = function() {
	return this.menu;
}

/**
 * abstract method called on click
 * @param event
 * @return void
 * @abstract
 */
MenuItem.prototype.onClick = function( event ) {

}

/**
 * Abstract. inherited types should create their HTML here
 * @return void
 * @abstract
 */
MenuItem.prototype.createHTML = function() {
	var text = document.createElement( "div" );
	text.textContent = this.text;
	this.DOMElem.appendChild( text );
}

/**
 * @returns {HTMLElement}
 */
MenuItem.prototype.getElement = function() {
	return this.DOMElem;
}

/**
 * Shows options as a "slideshow" with left and right buttons to change
 * @param menu
 * @param text
 * @param options
 * @constructor
 */
var SelectMenuItem = function( menu, text, options ) {
	this.superClass.constructor.call( this, menu, text );
	this.options = options;
	this.nCurrentOption = 0;
}

SelectMenuItem.prototype.onClick = function( event ) {
	this.nCurrentOption = ( this.nCurrentOption + 1 ) % this.options.length;
	//TODO change selected item
}

inherit( SelectMenuItem, MenuItem );

/**
 * Same as SelectMenuItem, but with predefined options "On" & "Off"
 * @param menu
 * @param text
 * @constructor
 */
var OnOffMenuItem = function( menu, text ) {
	this.superClass.call( this, menu, text, [ "On", "Off" ] );
}

inherit( OnOffMenuItem, SelectMenuItem );

/**
 * MenuItem to get back to parentmenu
 * @param menu
 * @type Menu
 * @param parentMenu
 * @type Menu
 * @constructor
 */
var BackMenuItem = function( menu, parentMenu ) {
	this.superClass.constructor.call( this, menu, "Back" );
	this.parentMenu = parentMenu;
}

/**
 * Hides the current menu and shows the parentmenu
 * @param event
 */
BackMenuItem.prototype.onClick = function( event ) {
	this.getMenu().hide();
	this.parentMenu.show();
}

inherit( BackMenuItem, MenuItem );

/**
 * MenuItem to navigate to submenu
 * eg. StartMenu -> click options menuItem -> optionsmenu
 * @param menu
 * @param text
 * @param subMenu
 * @constructor
 */
var SubMenuItem = function( menu, text, subMenu ) {
	this.superClass.constructor.call( this, menu, text );
	this.subMenu = subMenu;
}

/**
 * Hides the current menu and shows the submenu
 * @param event
 */
SubMenuItem.prototype.onClick = function( event ) {
	this.getMenu().hide();
	this.subMenu.show();
}

inherit( SubMenuItem, MenuItem );

var ActionMenuItem = function(menu, text, fnAction) {
	this.superClass.constructor.call(this, menu, text);
	this.action = fnAction;
	this.DOMElem.onclick = fnAction;
}

ActionMenuItem.prototype.onClick = function(event){
	this.action();
}

inherit(ActionMenuItem, MenuItem);

