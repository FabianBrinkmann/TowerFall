//toggles the in-game-menu
function toggleIngameMenu() {
    const overlay = document.getElementById('ingame-overlay');
    if (overlay.style.display === 'none') {
        overlay.style.display = 'flex';
    } else if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    }
}

//toggles the mute state of music and a forbidden sign on top of the music button.
function muteMusic() {
    changeMuteMusic();
    const muteSymbol = document.getElementById('music-muted');
    if (muteSymbol.style.display === 'none') {
        muteSymbol.style.display = 'block';
    } else if (muteSymbol.style.display === 'block') {
        muteSymbol.style.display = 'none'
    }
}

//toggles the mute state of soundFx and a forbidden sign on top of the soundFx button.
function muteSound() {
    changeMuteSoundFx();
    const muteSymbol = document.getElementById('sound-muted');
    if (muteSymbol.style.display === 'none') {
        muteSymbol.style.display = 'block';
    } else if (muteSymbol.style.display === 'block') {
        muteSymbol.style.display = 'none'
    }
}

//restarts the game
function rematch() {
    restartGame();
}

