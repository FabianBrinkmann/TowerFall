
//Erstellt einen Pfeil und schießt ihn ab.
//shootingPlayer = der Spieler der schießt.
//imageName = das Bild das für den Pfeil benutzt werden soll.
function shoot(shootingPlayer, imageName)
{
    if(shootingPlayer.ammo > 0)
    {
        shootingPlayer.ammo += - 1;
        var arrow = ammo.create(16, 16, imageName);
        arrow.setBounce(0);
        arrow.setCollideWorldBounds(false);
        arrow.allowGravity = true;
        arrow.colided = false;
        //arrow.rotation = -50;
        //arrow.angularVelocity = -10;
        arrow.body.setGravity(0, 0);
        //arrow.on('', ammoCollide)
        arrow.player = shootingPlayer;

        switch (imageName)
        {
            case 'arrowRight':
                arrow.setVelocity(500, -80);
                Phaser.Display.Align.To.RightCenter(arrow, shootingPlayer, 0, 10);
                break;
            default:
                arrow.setVelocity(-500, -80);
                Phaser.Display.Align.To.LeftCenter(arrow, shootingPlayer, 0, 10);
        }
    }
}

function justShotTimer(player){
        player.shootBlocked=true;
    setTimeout( () => {
        player.shootBlocked = false;
    }, 500);
}

//Wird ausgelöst wenn ein Pfeil auf ein Tile trifft.
//collidedAmmo = die Munition die die Platform trifft.
//tile = dar Tile der getroffen wurde.
function ammoCollide(collidedAmmo, tile)
{
    collidedAmmo.setVelocity(0, 0);
    collidedAmmo.colided = true;
    collidedAmmo.body.allowGravity = false;
}

//Wird ausgelöst wenn ein Spieler einen Pfeil berührt.
//Wenn der Pfeil noch in bewegung ist stirbt der Spieler und wenn er liegt sammelt er ihn auf.
//player = der Spieler der den Pfeil berührt.
//arrow = der Pfeil der den Spieler berührt.
function hitAmmo (player, ammo)
{
    if(ammo.colided)
    {
        ammo.destroy();
        player.ammo += 1;
    }
    else
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
