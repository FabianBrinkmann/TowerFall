
if( window.sessionStorage.getItem( 'token' ) != null ) {
	//createMenu();
}
else {
	showLoginForm();
}


function createMenu() {

	var startMenu = new StartMenu();

	var manager = new MenuManager( startMenu.getMenues() );
	manager.createHTML();
	var elem = manager.getElement();
	document.getElementById( "overlay" ).appendChild( elem );
}
createMenu();
