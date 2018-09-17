var StartMenu = function() {

	this.rootMenu = new Menu( null );
	var startItem = new ActionMenuItem( this.rootMenu, "Start", () => {
		document.getElementById( "overlay" ).style.display = "none";
		gameAccessable();
	} );

	this.optionsMenu = new Menu( this.rootMenu );
	var optionsItem = new SubMenuItem( this.rootMenu, "Options", this.optionsMenu );


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

var PauseMenu = function() {

}

/**
 * Returns an array of the used menues
 * @return {Menu[]}
 */
PauseMenu.prototype.getMenues = function() {

}