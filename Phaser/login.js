// Login
function logIn() {
	const username = document.querySelectorAll( '[type="text"]' )[ 0 ].value;
	const password = document.querySelectorAll( '[type="password"]' )[ 0 ].value;
	ServerConnection.login( username, password, function( response ) {
		window.sessionStorage.setItem( 'token', JSON.parse( response.response ).token );
		if( window.sessionStorage.getItem( 'token' ) != null ) {
			document.getElementById( 'first-login' ).style.display = 'none';
			showMenu();
			hideLoginForm();
		}
	}, function( failedLogin ) {
		alert( 'Login failed. Please try again.' );
	} )

}

// Registration
function registration() {
	const username = document.querySelectorAll( '[type="text"]' )[ 1 ].value;
	const password = document.querySelectorAll( '[type="password"]' )[ 1 ].value;
	ServerConnection.register( username, password, function( response ) {
		window.sessionStorage.setItem( 'token', JSON.parse( response.response ).token );
		showLoginForm();
	}, function( failedRegistration ) {
		alert( 'Registration failed. Username may already been taken. Please try again.' );
	} )
}

// Switching between registration form and login form
function showRegistrationForm() {
	document.getElementById( 'first-login' ).style.display = 'none';
	document.getElementById( 'registration' ).style.display = 'flex';
}

function showLoginForm() {
	document.getElementById( 'registration' ).style.display = 'none';
	document.getElementById( 'first-login' ).style.display = 'flex';
}

function hideLoginForm() {
	document.getElementById( 'first-login' ).style.display = 'none';
}

// Enables Enter key to register or login
document.onkeydown = function(evt) {
	evt = evt || window.event;
	if (evt.keyCode === 13) {
		if (document.getElementById('first-login').style.display === 'flex') {
			logIn();
		} else if (document.getElementById('registration').style.display === 'flex') {
			registration();
		}
	}
};
