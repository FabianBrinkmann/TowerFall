// This file is used to handle ammunition
// shootingPlayer = the player shoots
// imageName = the image of the ammo being used
// direction = shooting direction

function shoot(shootingPlayer, direction)
{
    var imageName;

    if(shootingPlayer.ammo > 0)
    {
        if (shootingPlayer.options.character === "indian") {
            imageName="arrow" + direction;
            soundFx.arrowShotSound.play();
        } else {
            imageName = "bullet" + direction;
            soundFx.bulletShotSound.play();
        }


        shootingPlayer.ammo += -1;
        var ammo = ammunition.create(16, 16, imageName);
        ammo.setBounce(0);
        ammo.setCollideWorldBounds(false);
        ammo.allowGravity = true;
        ammo.colided = false;
        ammo.body.setGravity(0, 0);
        ammo.player = shootingPlayer;
        ammo.ignorePlayer = null;

        switch (direction)
        {
            case 'Right':
                ammo.setVelocity(500, -80);
                Phaser.Display.Align.To.RightCenter(ammo, shootingPlayer, -50, 10);
                break;
            default:
                ammo.setVelocity(-500, -80);
                Phaser.Display.Align.To.LeftCenter(ammo, shootingPlayer, -50, 10);
        }
    }
}

// Creates a short delay between every shot
function justShotTimer(player){
        player.shootBlocked = true;
    setTimeout( () => {
        player.shootBlocked = false;
    }, 200);
}

// Function being called when ammo collides with a tile
// collidedAmmo = the ammunition colliding with the environment
// tile = the tile being hit
function ammoCollide(collidedAmmo, tile)
{
    collidedAmmo.setVelocity(0, 0);
    collidedAmmo.colided = true;
    collidedAmmo.body.allowGravity = false;
    collidedAmmo.ignorePlayer = null;
}

// Function being called when ammo collides with a player
//
// If the ammunition is this in the air, the enemy player gets hit
// If it's laying on the ground, the ammo can be collected
// player = the player colliding with ammo
// ammo = the ammunition that is being touched
function hitAmmo (player, ammo)
{
    if(ammo.colided)
    {
        ammo.destroy();
        player.ammo += 1;
    }
    else
    {
        soundFx.hitSound.play();
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
