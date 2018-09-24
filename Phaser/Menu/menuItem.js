/**
 * @param menu
 * @param text
 * @constructor
 * @abstract
 */
var MenuItem = function( menu, text ) {
	this.text = text;
	this.DOMElem = document.createElement( "div" );
	this.DOMElem.classList.add( "menu-item" );
	this.DOMElem.onclick = this.onClick.bind( this );
	this.menu = menu;
};

/**
 * Returns the menu the item is associated with
 * @returns Menu
 */
MenuItem.prototype.getMenu = function() {
	return this.menu;
};

/**
 * abstract method called on click
 * @param event
 * @return void
 * @abstract
 */
MenuItem.prototype.onClick = function( event ) {

};

/**
 * @return return false indicates a hanlded event
 * @param keyEvent
 */
MenuItem.prototype.onKeyPressed = function( keyEvent ) {
	return true;
};

/**
 * Default. inherited types should create their HTML here
 * @return void
 * @abstract
 */
MenuItem.prototype.createHTML = function() {
	var text = document.createElement( "div" );
	text.textContent = this.text;
	this.DOMElem.appendChild( text );
};

/**
 * @returns {HTMLElement}
 */
MenuItem.prototype.getElement = function() {
	return this.DOMElem;
};

/**
 * Shows options as a "slideshow" with left and right buttons to change
 * @param menu
 * @param text
 * @param options object with properties name and value
 * @param fnOnChange calls the function with the new value
 * @constructor
 */
var SelectMenuItem = function( menu, text, options, fnOnChange, defaultValue ) {
	this.superClass.constructor.call( this, menu, text );
	this.options = options;
	this.nCurrentOption = 0;
	this.fnOnChange = fnOnChange;
	if( defaultValue ) {
		var index = this.options.map( ( obj ) => obj.name ).indexOf( defaultValue );
		if( index >= 0 ) {
			this.nCurrentOption = index;
		}

	}
	if( this.fnOnChange instanceof Function ) {
		fnOnChange( this.options[ this.nCurrentOption ].value );
	}
};

SelectMenuItem.prototype.onClick = function( event ) {
	this._changeRight();
};

/**
 * Changes to next item
 * @private
 */
SelectMenuItem.prototype._changeRight = function() {
	var children = this.DOMElem.getElementsByClassName( "option-value" );
	children[ this.nCurrentOption ].classList.remove( "selected" );
	this.nCurrentOption = ( this.nCurrentOption + 1 + this.options.length ) % this.options.length;
	children[ this.nCurrentOption ].classList.add( "selected" );
	this.fnOnChange( this.options[ this.nCurrentOption ].value );
};

/**
 * Changes to previous item
 * @private
 */
SelectMenuItem.prototype._changeLeft = function() {
	var children = this.DOMElem.getElementsByClassName( "option-value" );
	children[ this.nCurrentOption ].classList.remove( "selected" );
	this.nCurrentOption = ( this.nCurrentOption - 1 + this.options.length ) % this.options.length;
	children[ this.nCurrentOption ].classList.add( "selected" );
	this.fnOnChange( this.options[ this.nCurrentOption ].value );
};

SelectMenuItem.prototype.onKeyPressed = function( keyEvent ) {
	var key = keyEvent.keyCode ? keyEvent.keyCode : keyEvent.which;
	switch ( key ) {
		case 37: //left
			this._changeLeft();
			return false;
		case 39: //right
			this._changeRight();
			return false;
	}
	return true;

};

SelectMenuItem.prototype.createHTML = function() {
	var left = document.createElement( "div" );
	left.classList.add( "option-name" );
	var right = document.createElement( "div" );
	right.classList.add( "option-values" );
	this.options.forEach( ( elem, ind, arr ) => {
		var value = document.createElement( "div" );
		value.classList.add( "option-value" );
		if( ind == this.nCurrentOption )
			value.classList.add( "selected" );
		value.textContent = elem.name;
		right.appendChild( value );
	} );
	left.textContent = this.text;
	this.DOMElem.appendChild( left );
	this.DOMElem.appendChild( right );
};

inherit( SelectMenuItem, MenuItem );

/**
 * Same as SelectMenuItem, but with predefined options "On" & "Off"
 * @param menu
 * @type Menu
 * @param text
 * @type String
 * @param fnOnChange is called with the new value
 * @type Function
 * @constructor
 */
var OnOffMenuItem = function( menu, text, fnOnChange ) {
	return new SelectMenuItem( menu, text,
		[
			{ name: "On", value: true },
			{ name: "Off", value: false }
		],
		fnOnChange );
};

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
};

/**
 * Hides the current menu and shows the parentmenu
 * @param event
 */
BackMenuItem.prototype.onClick = function( event ) {
	this.getMenu().hide();
	this.parentMenu.show();
};

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
};

/**
 * Hides the current menu and shows the submenu
 * @param event
 */
SubMenuItem.prototype.onClick = function( event ) {
	this.getMenu().hide();
	this.subMenu.show();
};

inherit( SubMenuItem, MenuItem );

/**
 * MenuItem which calls a given function onClick
 * @param menu
 * @param text
 * @param fnAction
 * @constructor
 */
var ActionMenuItem = function( menu, text, fnAction ) {
	this.superClass.constructor.call( this, menu, text );
	this.action = fnAction;
	this.DOMElem.onclick = fnAction;
};

ActionMenuItem.prototype.onClick = function( event ) {
	this.action();
};

inherit( ActionMenuItem, MenuItem );


var TextInputMenuItem = function( menu, text, fnOnChange, strDefault ) {
	this.superClass.constructor.call( this, menu, text );
	this.fnOnChange = fnOnChange;
	this.defaultValue = strDefault;
};

TextInputMenuItem.prototype.createHTML = function() {
	var left = document.createElement( "div" );
	left.classList.add( "option-name" );
	this.right = document.createElement( "input" );
	this.right.setAttribute( "type", "text" );
	this.right.classList.add( "option-values" );
	this.right.classList.add( "option-input" );
	this.right.value = this.defaultValue;
	left.textContent = this.text;
	this.DOMElem.appendChild( left );
	this.DOMElem.appendChild( this.right );
	this.fnOnChange(this.right.value);
};

TextInputMenuItem.prototype.onKeyPressed = function( keyEvent ) {
	this.fnOnChange( this.right.value );
};

inherit( TextInputMenuItem, MenuItem );