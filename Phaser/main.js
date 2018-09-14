/*
if( window.localStorage.getItem( 'token' ) != null ) {
	gameAccessable();
	document.getElementById( 'overlay' ).style.display = 'none';
}
else {
	showLoginForm();
}
*/

function createMenu() {
	var rootMenu = new Menu( null );
	var startItem = new ActionMenuItem( rootMenu, "Start", () => {
		document.getElementById("overlay").style.display = "none";
		gameAccessable();
	} );

	var optionsMenu = new Menu( rootMenu );
	var optionsItem = new SubMenuItem( rootMenu, "Options", optionsMenu );


	rootMenu.addItem( startItem );
	rootMenu.addItem( optionsItem );
	var manager = new MenuManager( [ rootMenu, optionsMenu ] );
	manager.createHTML();
	var elem = manager.getElement();
	document.getElementById( "overlay" ).appendChild( elem );
}

createMenu();
