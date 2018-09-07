
//Erstellt eine Munition und schießt sie ab.
//shootingPlayer = der Spieler der schießt.
//imageName = das Bild das für die Munition benutzt werden soll.
//direktion = Die Richtung in die geschossen werden soll.
function shoot(shootingPlayer, imageName, direktion)
{
    if(shootingPlayer.ammo > 0)
    {
        shootingPlayer.ammo += - 1;
        var ammo = ammunition.create(16, 16, imageName);
        ammo.setBounce(0);
        ammo.setCollideWorldBounds(false);
        ammo.allowGravity = true;
        ammo.colided = false;
        ammo.body.setGravity(0, 0);
        ammo.player = shootingPlayer;

        switch (direktion)
        {
            case 'right':
                ammo.setVelocity(500, -80);
                Phaser.Display.Align.To.RightCenter(ammo, shootingPlayer, 0, 10).rotation = 180;
                break;
            default:
                ammo.setVelocity(-500, -80);
                Phaser.Display.Align.To.LeftCenter(ammo, shootingPlayer, 0, 10);
        }
    }
}

function justShotTimer(player){
        player.shootBlocked=true;
    setTimeout( () => {
        player.shootBlocked = false;
    }, 500);
}

//Wird ausgelöst wenn eine Munition auf ein Tile trifft.
//collidedAmmo = die Munition die die Platform trifft.
//tile = der Tile der getroffen wurde.
function ammoCollide(collidedAmmo, tile)
{
    collidedAmmo.setVelocity(0, 0);
    collidedAmmo.colided = true;
    collidedAmmo.body.allowGravity = false;
}

//Wird ausgelöst wenn ein Spieler eine Munition berührt.
//Wenn der Pfeil noch in bewegung ist stirbt der Spieler und wenn er liegt sammelt er ihn auf.
//player = der Spieler der die Munition berührt.
//ammo = die Munition die den Spieler berührt.
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
