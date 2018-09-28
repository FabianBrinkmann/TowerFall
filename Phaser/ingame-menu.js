//toggles the in-game-menu
function toggleIngameMenu() {
    const overlay = document.getElementById('ingame-overlay');
    if (overlay.style.display === 'none') {
        overlay.style.display = 'flex';
    } else if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    }
}

//toggles forbidden signs on top of the music and the sound button.
function toggleMuteSigns() {
    const musicMuteSymbol = document.getElementById('music-muted');
    const soundMuteSymbol = document.getElementById('sound-muted');

    if (music.mute){
        musicMuteSymbol.style.display = 'block';
    } else {
        musicMuteSymbol.style.display = 'none';
    }
    if (soundFx.jumpSound.mute) {
        soundMuteSymbol.style.display = 'block';
    } else {
        soundMuteSymbol.style.display = 'none';

    }
}


//restarts the game
function rematch() {
    restartGame();
}

