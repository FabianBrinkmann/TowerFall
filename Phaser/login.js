
function logIn() {
//    let information = document.getElementById("first-login-form").submit();

    const username = document.querySelectorAll('[type="text"]')[0].value;
    const password = document.querySelectorAll('[type="password"]')[0].value;
    ServerConnection.login(username, password, function (response) {
        window.localStorage.setItem('token', JSON.parse(response.response).token);
        console.log(window.localStorage.getItem('token'));
        if(window.localStorage.getItem('token') != null) {
            gameAccessable();
            document.getElementById('overlay').style.display = 'none';
        }
    }, function (failedLogin) {
        alert('Login failed. Please try again.');
    })

}

function registration() {
    const username = document.querySelectorAll('[type="text"]')[1].value;
    const password = document.querySelectorAll('[type="password"]')[1].value;
    ServerConnection.register(username, password, function (response) {
        console.log(response);
        console.log(document.querySelectorAll('[type="text"]'));
        showLoginForm();
    }, function (failedRegistration) {
        alert('Registration failed. Username may already been taken. Please try again.');
    })
}


function showRegistrationForm() {
    document.getElementById('first-login').style.display = 'none';
    document.getElementById('registration').style.display = 'flex';
}

function showLoginForm() {
    document.getElementById('registration').style.display = 'none';
    document.getElementById('first-login').style.display = 'flex';
}

function clearStorage() {
    sessionStorage.clear();
}