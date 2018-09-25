function toggleIngameMenu() {
    const overlay = document.getElementById('ingame-overlay');
    if (overlay.style.display === 'none') {
        overlay.style.display = 'flex';
    } else if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    }
}

function muteMusic() {
    changeMuteMusic();
    const muteSymbol = document.getElementById('music-muted');
    if (muteSymbol.style.display === 'none') {
        muteSymbol.style.display = 'block';
    } else if (muteSymbol.style.display === 'block') {
        muteSymbol.style.display = 'none'
    }
}

function muteSound() {
    changeMuteSoundFx();
    const muteSymbol = document.getElementById('sound-muted');
    if (muteSymbol.style.display === 'none') {
        muteSymbol.style.display = 'block';
    } else if (muteSymbol.style.display === 'block') {
        muteSymbol.style.display = 'none'
    }
}

function rematch() {
    restartGame();
}

