var StartMenu = function() {

	this.options = {};

	this.rootMenu = new Menu( null );
	var startItem = new ActionMenuItem( this.rootMenu, "Start", () => {
		document.getElementById( "overlay" ).style.display = "none";
		gameAccessable();
	} );

	this.optionsMenu = new Menu( this.rootMenu );
	var optionsItem = new SubMenuItem( this.rootMenu, "Options", this.optionsMenu );

	var optChar = new SelectMenuItem( this.optionsMenu, "Character", [ "Cowboy" ],
		( value ) => this.options.char = value );
	var optSound = new OnOffMenuItem( this.optionsMenu, "Sound", ( value ) => this.options.soundEnabled = value );

	this.optionsMenu.addItem( optChar );
	this.optionsMenu.addItem( optSound );

	this.rootMenu.addItem( startItem );
	this.rootMenu.addItem( optionsItem );

}

/**
 * Returns an array of the used menues
 * @return {Menu[]}
 */
StartMenu.prototype.getMenues = function() {
	return [ this.rootMenu, this.optionsMenu ];
}

StartMenu.getOptions = function() {
	return this.options;
}

var PauseMenu = function() {

}

/**
 * Returns an array of the used menues
 * @return {Menu[]}
 */
PauseMenu.prototype.getMenues = function() {

}