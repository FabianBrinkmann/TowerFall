var StartMenu = function() {

	this.options = JSON.parse( window.localStorage.getItem( "options" ) ) || {};

	this.rootMenu = new Menu( null );
	this.optionsMenu = new Menu( this.rootMenu );
	this.optionsPlOne = new PlayerMenu( this.optionsMenu, this.options.players[ 0 ] );
	this.optionsPlTwo = new PlayerMenu( this.optionsMenu, this.options.players[ 1 ] );

	var startItem = new ActionMenuItem( this.rootMenu, "Start", () => {
		window.localStorage.setItem( "options", JSON.stringify( this.getOptions() ) );
		document.getElementById( "overlay" ).style.display = "none";
		console.log( this.getOptions() );
		gameAccessable( this.getOptions() );
	} );

	var optionsItem = new SubMenuItem( this.rootMenu, "Options", this.optionsMenu );

	var logoutItem = new ActionMenuItem( this.rootMenu, "Logout", () => {
		window.sessionStorage.clear();
		showLoginForm();
		hideMenu();
	} )


	var optionsPlOneItem = new SubMenuItem( this.optionsMenu, "Player 1", this.optionsPlOne.getMenu() );
	var optionsPlTwoItem = new SubMenuItem( this.optionsMenu, "Player 2", this.optionsPlTwo.getMenu() );

	var optMusic = new OnOffMenuItem( this.optionsMenu,
		"Music",
		( value ) => this.options.musicEnabled = value,
		this.options.musicEnabled );
	var optSound = new OnOffMenuItem( this.optionsMenu, "Sound Effects",
		( value ) => this.options.soundEnabled = value,
		this.options.soundEnabled );


	var optMap = new SelectMenuItem( this.optionsMenu, "Map",
		[
			{ name: "Map1", value: "map1" },
			{ name: "Map2", value: "map2" }
		],
		( value ) => this.options.map = value, this.options.map );


	this.optionsMenu.addItem( optionsPlOneItem );
	this.optionsMenu.addItem( optionsPlTwoItem );
	this.optionsMenu.addItem( optMusic );
	this.optionsMenu.addItem( optSound );
	this.optionsMenu.addItem( optMap );

	this.rootMenu.addItem( startItem );
	this.rootMenu.addItem( optionsItem );
	this.rootMenu.addItem( logoutItem );

}

/**
 * Returns an array of the used menues
 * @return {Menu[]}
 */
StartMenu.prototype.getMenues = function() {
	return [ this.rootMenu, this.optionsMenu, this.optionsPlOne.getMenu(), this.optionsPlTwo.getMenu() ];
}

StartMenu.prototype.getOptions = function() {
	this.options.players = [
		this.optionsPlOne.getOptions(),
		this.optionsPlTwo.getOptions()
	]
	return this.options;
}

var PlayerMenu = function( parentMenu, objDefaults ) {
	this.options = objDefaults;
	this.optionsMenu = new Menu( parentMenu );
	var nameItem = new TextInputMenuItem( this.optionsMenu, "Name",
		( value ) => this.options.name = value, this.options.name );
	var characterItem = new SelectMenuItem( this.optionsMenu, "Character", availableChars,
		( value ) => this.options.character = value, this.options.character );
	this.optionsMenu.addItem( nameItem );
	this.optionsMenu.addItem( characterItem );
}

PlayerMenu.prototype.getMenu = function() {
	return this.optionsMenu;
}

PlayerMenu.prototype.getOptions = function() {
	return this.options;
}
