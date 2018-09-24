function logIn() {
//    let information = document.getElementById("first-login-form").submit();

	const username = document.querySelectorAll( '[type="text"]' )[ 0 ].value;
	const password = document.querySelectorAll( '[type="password"]' )[ 0 ].value;
	ServerConnection.login( username, password, function( response ) {
		window.sessionStorage.setItem( 'token', JSON.parse( response.response ).token );
		console.log( window.sessionStorage.getItem( 'token' ) );
		if( window.sessionStorage.getItem( 'token' ) != null ) {
			//createMenu();
			document.getElementById( 'first-login' ).style.display = 'none';
			showMenu();
			hideLoginForm();
		}
	}, function( failedLogin ) {
		alert( 'Login failed. Please try again.' );
	} )

}

function registration() {
	const username = document.querySelectorAll( '[type="text"]' )[ 1 ].value;
	const password = document.querySelectorAll( '[type="password"]' )[ 1 ].value;
	ServerConnection.register( username, password, function( response ) {
		window.sessionStorage.setItem( 'token', JSON.parse( response.response ).token );
		hideRegistrationForm();
		showLoginForm();
		//createMenu();
	}, function( failedRegistration ) {
		alert( 'Registration failed. Username may already been taken. Please try again.' );
	} )
}


function showRegistrationForm() {
	document.getElementById( 'first-login' ).style.display = 'none';
	document.getElementById( 'registration' ).style.display = 'flex';
}

function showLoginForm() {
	document.getElementById( 'registration' ).style.display = 'none';
	document.getElementById( 'first-login' ).style.display = 'flex';
}

function hideRegistrationForm() {
	document.getElementById( 'registration' ).style.display = 'none';
}

function hideLoginForm() {
	document.getElementById( 'first-login' ).style.display = 'none';
}

function clearStorage() {
	sessionStorage.clear();
}