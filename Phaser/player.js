function createPlayer(game, playerNumber) {
    var player;
    if (playerNumber===1) {
        player = game.physics.add.sprite(200, 450, 'cowboy');
        player.right=true;
        player.left=false;
    }else {
        player = game.physics.add.sprite(400, 450, 'cowboy');
        player.right=false;
        player.left=true;
    }


    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0);
    player.ammo = 3;
    player.setCollideWorldBounds(true);
    player.body.overlapY = 16;
    player.shootBlocked=false;

    //  Our player animations, turning, walking left and walking right.
    game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('cowboy', {start: 1, end: 3}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('cowboy', {start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: 'lookLeft',
            frames: [{key: 'cowboy', frame: 4}],
            frameRate: 20
        });

    game.anims.create({
            key: 'lookRight',
            frames: [{key: 'cowboy', frame: 5}],
            frameRate: 20
        });

    game.anims.create({
        key: 'shootLeft',
        frames: [{key: 'cowboy', frame: 0}],
        frameRate: 20
    });

    game.anims.create({
        key: 'shootRight',
        frames: [{key: 'cowboy', frame: 9}],
        frameRate: 20
    });



    // set player text

    var style = {font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

    if (playerNumber===1) {
        player.name='PlayerOne';
    }
    else player.name='PlayerTwo';

    player.playerText = Phaser.Display.Align.To.TopCenter(game.add.text(16, 16, player.name + player.ammo, style), player, 0, 0);


    return player;
}




function updatePlayer(player) {


    if (player.cursorLeft.isDown)
    {
        player.hasJustShot=false;
        player.setVelocityX(-160);

        player.anims.play('left', true);
        player.left = true;
        player.right = false;
    }
    else if (player.cursorRight.isDown)
    {
        player.hasJustShot=false;
        player.setVelocityX(160);

        player.anims.play('right', true);
        player.right = true;
        player.left = false;
    }
    else
    {
        if (player.right && !player.hasJustShot)
        {
            player.anims.play('lookRight', true);
        }
        else if (player.left && !player.hasJustShot)
        {
            player.anims.play('lookLeft', true);
        }

        player.setVelocityX(0);
    }

    if (player.cursorShoot.isDown && !player.shootBlocked)
    {
        player.hasJustShot=true;
        if (player.left)
        {
            player.anims.play('shootLeft');
            shoot(player, 'arrowLeft', 'left');
            justShotTimer(player);
        }
        else if (player.right)
        {
            player.anims.play('shootRight');
            shoot(player, 'arrowRight', 'right');
            justShotTimer(player);
        }
    }
    //console.log(player.body.touching.down);
    if (player.cursorUp.isDown && player.body.blocked.down)//&& player.body.touching.down
    {
        player.setVelocityY(-330);
    }
    player.playerText.text = player.name +' ' + player.ammo;
    player.playerText.updateText();
    player.playerText = Phaser.Display.Align.To.TopCenter(player.playerText, player, 0, 0);
}
