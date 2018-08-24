var right;
var left;

function createPlayer(game, playerNumber) {
    right = false;
    left = false;
    var player;
    if (playerNumber===1) {
        player = game.physics.add.sprite(200, 450, 'dude');
    }else {
        player = game.physics.add.sprite(400, 450, 'dude');
    }


    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0);
    player.ammo = 3;
    player.setCollideWorldBounds(true);
    player.body.overlapY = 16;


    //  Our player animations, turning, walking left and walking right.
    game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

    game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: 'lookLeft',
            frames: [{key: 'dude', frame: 0}],
            frameRate: 20
        });

    game.anims.create({
            key: 'lookRight',
            frames: [{key: 'dude', frame: 5}],
            frameRate: 20
        });

    // set player text

    var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

    if (playerNumber===1) {
        player.name='PlayerOne';
    }
    else player.name='PlayerTwo';

    player.playerText = Phaser.Display.Align.To.TopCenter(game.add.text(16, 16, player.name+' 3', style), player, 0, 0);


    return player;
}




function updatePlayer(player) {


    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        left = true;
        right = false;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
        right = true;
        left = false;
    }
    else
    {
        if (right)
        {
            player.anims.play('lookRight', true);
        }
        else if (left)
        {
            player.anims.play('lookLeft', true);
        }
        else {
            {
                player.anims.play('turn', true);
            }
        }
        player.setVelocityX(0);
        //player.anims.play('turn');
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && !justShot)
    {
        if (left)
        {
            shoot(player, 'arrowLeft');
            justShotTimer();
        }
        else if (right)
        {
            shoot(player, 'arrowRight');
            justShotTimer();
        }
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    player.playerText.text = player.name +' ' + player.ammo;
    player.playerText.updateText();
    player.playerText = Phaser.Display.Align.To.TopCenter(player.playerText, player, 0, 0);

}

