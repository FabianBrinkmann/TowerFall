var StartMenu = function() {

	this.options = {};

	this.rootMenu = new Menu( null );
	var startItem = new ActionMenuItem( this.rootMenu, "Start", () => {
		document.getElementById( "overlay" ).style.display = "none";
		gameAccessable();
	} );

	var logoutItem = new ActionMenuItem( this.rootMenu, "Logout", () => {

	} )

	this.optionsMenu = new Menu( this.rootMenu );
	var optionsItem = new SubMenuItem( this.rootMenu, "Options", this.optionsMenu );

	var optChar = new SelectMenuItem( this.optionsMenu, "Character",
		[
			{ name: "Cowboy", value: "cowboy.png" },
			{ name: "Dude", value: "dude.png" }
		],
		( value ) => this.options.char = value );
	var optSound = new OnOffMenuItem( this.optionsMenu, "Sound", ( value ) => this.options.soundEnabled = value );

	var optCharName = new TextInputMenuItem( this.optionsMenu, "Player1 name", ( value ) => console.log( value ) );

	this.optionsMenu.addItem( optChar );
	this.optionsMenu.addItem( optSound );
	this.optionsMenu.addItem( optCharName );

	this.rootMenu.addItem( startItem );
	this.rootMenu.addItem( optionsItem );
	this.rootMenu.addItem( logoutItem );

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

