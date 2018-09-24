function createMenu() {

	var startMenu = new StartMenu();

	var manager = new MenuManager( startMenu.getMenues() );
	manager.createHTML();
	var elem = manager.getElement();
	elem.id="start-menu";
	elem.style.display = "none";
	document.getElementById( "overlay" ).appendChild( elem );
}

function hideMenu(){
	document.getElementById("start-menu").style.display = "none";
}

function showMenu(){
	document.getElementById("start-menu").style.display = "block";
}

createMenu();


if( window.sessionStorage.getItem( 'token' ) != null ) {
	showMenu();
}
else {
	showLoginForm();
}