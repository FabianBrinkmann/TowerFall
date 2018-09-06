function logIn() {
//    let information = document.getElementById("first-login-form").submit();

    const username = document.querySelectorAll('[type="text"]')[0].value;
    const password = document.querySelectorAll('[type="password"]')[0].value;
    ServerConnection.login(username, password, function (response) {
        
    })

}