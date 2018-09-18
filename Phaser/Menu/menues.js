var StartMenu = function() {

	this.options = {};

	this.rootMenu = new Menu( null );
	this.optionsMenu = new Menu( this.rootMenu );
	this.optionsPlOne = new PlayerMenu( this.optionsMenu );
	this.optionsPlTwo = new PlayerMenu( this.optionsMenu );

	var startItem = new ActionMenuItem( this.rootMenu, "Start", () => {
		document.getElementById( "overlay" ).style.display = "none";
		console.log(this.getOptions());
		gameAccessable(this.getOptions());
	} );

	var optionsItem = new SubMenuItem( this.rootMenu, "Options", this.optionsMenu );

	var logoutItem = new ActionMenuItem( this.rootMenu, "Logout", () => {

	} )


	var optionsPlOneItem = new SubMenuItem( this.optionsMenu, "Player 1", this.optionsPlOne.getMenu() );
	var optionsPlTwoItem = new SubMenuItem( this.optionsMenu, "Player 2", this.optionsPlTwo.getMenu() );

	var optSound = new OnOffMenuItem( this.optionsMenu, "Sound", ( value ) => this.options.soundEnabled = value );

	var optMap = new SelectMenuItem( this.optionsMenu, "Map",
		[
			{ name: "Map1", value: "TowerFall.json" },
			{ name: "Map2", value: "TowerFall_2.json" }
		],
		( value ) => this.options.map = value, "Map2" );


	this.optionsMenu.addItem( optionsPlOneItem );
	this.optionsMenu.addItem( optionsPlTwoItem );
	//this.optionsMenu.addItem( optChar );
	this.optionsMenu.addItem( optSound );
	this.optionsMenu.addItem( optMap );
	//this.optionsMenu.addItem( optCharName1 );
	//this.optionsMenu.addItem( optCharName2 );

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

var PlayerMenu = function( parentMenu ) {
	this.options = {};
	this.optionsMenu = new Menu( parentMenu );
	var nameItem = new TextInputMenuItem( this.optionsMenu, "Name",
		( value ) => this.options.name = value );
	var characterItem = new SelectMenuItem( this.optionsMenu, "Character", availableChars,
		( value ) => this.options.character = value );
	this.optionsMenu.addItem( nameItem );
	this.optionsMenu.addItem( characterItem );
}

PlayerMenu.prototype.getMenu = function() {
	return this.optionsMenu;
}

PlayerMenu.prototype.getOptions = function() {
	return this.options;
}
