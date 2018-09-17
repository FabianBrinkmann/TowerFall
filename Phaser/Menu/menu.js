/**
 *
 * @param parentMenu
 * @type Menu
 * @constructor
 */
var Menu = function( parentMenu ) {
	this.parent = parentMenu;
	if( this.parent )
		this.backItem = new BackMenuItem( this, parentMenu );

	this._buildDOMElem();
	this.menuItems = [];
	this.currentItem = 0;
	this.totalItems = 0;
}

Menu.prototype._buildDOMElem = function() {
	this.DOMElem = document.createElement( "div" );
	this.DOMElem.setAttribute( "tabindex", "0" ); //needed for keyevents
	this.DOMElem.classList.add( "menu" );
	this.DOMElem.onkeypress = this.onKeyPress.bind( this );
}

/**
 * Called when a key is pressed
 * @param keyEvent
 */
Menu.prototype.onKeyPress = function( keyEvent ) {
	var key = keyEvent.keyCode ? keyEvent.keyCode : keyEvent.which;

	switch ( key ) {
		case 13:
			this.enter();
			break;
		case 38:
			this.up();
			break;
		case 40:
			this.down();
			break;
	}
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
	if(this.backItem)
		this.menuItems.push(this.backItem);
	this.menuItems.forEach( function( menuItem ) {
		menuItem.createHTML();
		this.DOMElem.appendChild( menuItem.getElement() );
	}.bind( this ) );
	this.menuItems[0].getElement().classList.add("selected");

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
 * Gets the focus
 * @return void
 */
Menu.prototype.show = function() {
	this.DOMElem.style.display = "block";
	this.DOMElem.focus();
}

/**
 * Hides the menu by setting stlye display:none
 * @return void
 */
Menu.prototype.hide = function() {
	this.DOMElem.style.display = "none";
}

/**
 * changes the selected menuItem
 * @return void
 */
Menu.prototype.down = function() {
	this.menuItems[ this.currentItem ].getElement().classList.remove( "selected" );
	this.currentItem = ( this.currentItem + 1 + this.menuItems.length ) % this.menuItems.length;
	this.menuItems[ this.currentItem ].getElement().classList.add( "selected" );
}

/**
 * changes the selected menuItem
 * @return void
 */
Menu.prototype.up = function() {
	this.menuItems[ this.currentItem ].getElement().classList.remove( "selected" );
	this.currentItem = ( this.currentItem - 1 + this.menuItems.length ) % this.menuItems.length;
	this.menuItems[ this.currentItem ].getElement().classList.add( "selected" );
}

Menu.prototype.enter = function() {
	this.menuItems[ this.currentItem ].onClick();
}




