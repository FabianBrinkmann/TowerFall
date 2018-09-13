if(window.localStorage.getItem('token')!=null){
    gameAccessable();
    document.getElementById('overlay').style.display = 'none';
}
else {
    showLoginForm();
}
