function shootArrow(shootingPlayer, imageName)
{
    if(shootingPlayer.ammo > 0)
    {
        playerOne.ammo += - 1;
        var arrow = ammo.create(16, 16, imageName);
        arrow.setBounce(0);
        arrow.setCollideWorldBounds(true);
        arrow.allowGravity = true;
        arrow.colided = false;
        //arrow.rotation = -50;
        //arrow.angularVelocity = -10;
        arrow.body.setGravity(0, 0);
        //arrow.on('', arrowCollide)

        switch (imageName)
        {
            case 'arrowRight':
                arrow.setVelocity(500, -80);
                Phaser.Display.Align.To.RightCenter(arrow, shootingPlayer, 0, 10);
                break;
            default:
                arrow.setVelocity(-500, -80);//-400
                Phaser.Display.Align.To.LeftCenter(arrow, playerOne, 0, 10);
        }
        //console.log(arrow.body.velocity);
    }
}

function justShotTimer(){
    justShot = true;
    setTimeout( () => {
        justShot = false
    }, 500);
}

function arrowCollide(platform, collidedArrow)
{
    collidedArrow.setVelocity(0, 0);
    collidedArrow.colided = true;
    collidedArrow.body.allowGravity = false;
}


function hitArrow (player, arrow)
{
    if(arrow.colided)
    {
        arrow.destroy();
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
