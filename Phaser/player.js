function createPlayer(game, playerNumber) {
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


    if (player.cursorLeft.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        player.left = true;
        player.right = false;
    }
    else if (player.cursorRight.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
        player.right = true;
        player.left = false;
    }
    else
    {
        if (player.right)
        {
            player.anims.play('lookRight', true);
        }
        else if (player.left)
        {
            player.anims.play('lookLeft', true);
        }
        else {
            player.anims.play('turn', true);
        }
        player.setVelocityX(0);
        //player.anims.play('turn');
    }

    if (player.cursorShoot.isDown && !justShot)
    {
        if (player.left)
        {
            shoot(player, 'arrowLeft');
            justShotTimer();
        }
        else if (player.right)
        {
            shoot(player, 'arrowRight');
            justShotTimer();
        }
    }

    if (player.cursorUp.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    player.playerText.text = player.name +' ' + player.ammo;
    player.playerText.updateText();
    player.playerText = Phaser.Display.Align.To.TopCenter(player.playerText, player, 0, 0);

}